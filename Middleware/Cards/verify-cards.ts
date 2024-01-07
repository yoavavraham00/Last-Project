import { RequestHandler } from "express";
import  ApplicationError  from "../../Errors/appliction-error"
import jwt from "jsonwebtoken";
import { RequestUser } from "../../@types/express";
import Card from "../../DB/Model/card.model";

export const verifyCardsUserId: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    throw new ApplicationError(400, "No Auth Header");
  }

  const token = header.split(" ")[1];
  const secret = process.env.JWT_SECRET ?? "";

  try {
    const payload = jwt.verify(token, secret) as RequestUser;
    req.user = payload;

    const card = await Card.findById(req.params.id);

if (!card) {
  throw new ApplicationError(404, "Card not found");
}

if (card.user_id.toString() !== req.user.id) {
  throw new ApplicationError(401, "Only the specific registered user can access");
}
  else if (card.user_id.toString() === req.user.id) {
    return next();
  }
  } catch (e) {
    next(e);
  }
};