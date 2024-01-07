import { Router } from "express";
import  Card  from "../DB/Model/card.model";
import { verifyToken } from "../Middleware/Common/verify-token";
import { validateCard } from "../Middleware/Common/schemas-Validation"
import { verifyIsBusiness } from "../Middleware/Common/verrify-business";
import { ICard } from "../DB/Types/models";
import { validateCardUpdate } from "../Middleware/Common/schemas-Validation";
import { verifyUserOrAdmin } from "../Middleware/Users/verify-user-or-admin";
import { verifyCardsUserId } from "../Middleware/Cards/verify-cards";
import { ICardUpDate } from "../DB/Types/db";

const cardsRouter = Router();

cardsRouter.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (e) {
    next(e);
  }
}); //Get all the cards

cardsRouter.get("/my-cards", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cards = await Card.find({ user_id: userId });
    res.json(cards);
  } catch (e) {
    next(e);
  }
}); //Get the cards only for the requested user

cardsRouter.get("/:id", async (req, res, next) => {
    try {
    const id = req.params.id;
    const card = await Card.findById(id);
      if (!card) {
        return res.status(404).json({ message: `the Card with id: ${id} Not found` });
      }
      res.json(card);
    } 
      catch (e) {
    console.log(e);
    next(e);
    }
  }); //Get a card by id

cardsRouter.post("/", validateCard, verifyIsBusiness,  async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const card = await Card.create({ ...req.body, user_id: userId });
    res.status(201).json(card);
  } catch (e) {
    next(e);
  }
}); //Post a card

cardsRouter.put("/:id", validateCard, verifyCardsUserId, async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body as ICard;
      const updatedCard = await Card.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updatedCard) {
        return res.status(404).json({ message: `the Card with: ${id} Not found` });
      }
      res.json(updatedCard);
    } catch (e) {
      next(e);
    }
  }); //Update a card by id

  cardsRouter.patch("/:id",verifyToken, validateCardUpdate, async (req, res, next) => {
    try {
      const cardId = req.params.id;
      const userId = req.user.id; // ID of the user who is liking/unliking the card
  
      // Find the card
      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: `Card with id: ${cardId} not found` });
      }
  
      // Toggle like status
      const userLikeIndex = card.likes.indexOf(userId);
      if (userLikeIndex === -1) {
        // User hasn't liked the card, add their like
        card.likes.push(userId);
      } else {
        // User already liked the card, remove their like
        card.likes.splice(userLikeIndex, 1);
      }
  
      // Save the updated card
      const updatedCard = await card.save();
  
      res.json(updatedCard);
    } catch (e) {
      next(e);
    }
  }); //Update a card likes by id

    cardsRouter.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
        try {
        const id = req.params.id;
    
        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            return res.status(404).json({ message: `the Card with id: ${id} Not found` });
        }
        res.json(deletedCard);
        } catch (e) {
        next(e);
        }
    }); //Delete a card by id

export default cardsRouter; // create a post route for the user