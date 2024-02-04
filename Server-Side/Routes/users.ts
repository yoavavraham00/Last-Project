import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../DB/Types/models";
import User from "../DB/Model/user.model";
import { validateUser, validateUserUpdate } from "../Middleware/Common/schemas-Validation";
import { userService } from "../Services/user.service";
import { validateLogin } from "../Middleware/Common/schemas-Validation";
import { ILogin } from "../DB/Types/models";
import ApplicationError from './../Errors/appliction-error';
import { verifyToken } from "../Middleware/Common/verify-token";
import { verifyAdmin } from "../Middleware/Common/verify-admin"; 
import { verifyUserOrAdmin } from "../Middleware/Users/verify-user-or-admin";
import { verifyUser } from "../Middleware/Users/verify-user";
import { IUserUpdate } from "../DB/Types/db";


const usersRouter = Router(); // create a router object in order to use the router methods

usersRouter.post("/", validateUser, async (req, res, next) => {
  const body = req.body as IUser; // get the body from the request
  console.log(body)
  try {
    const savedUser = await userService.saveUser(body); // save the user

    return res.status(200).json(savedUser);
  } catch (e) {
    console.log(e.message)
    return res.status(400).json(e);
  } 
}); // post a user

usersRouter.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const token = await userService.login(email, password);
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
}); // login a user

usersRouter.get("/", verifyAdmin, async (req, res, next) => {
  const users = await User.find();
  return res.json(users);
}); //Get all the users

usersRouter.get("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
  const id = req.params.id;
  const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(user);
  } 
    catch (e) {
  console.log(e);
  next(e);
  }
}); //Get a user by id

usersRouter.put("/:id", verifyUser,  async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as IUser;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
}); //Update a user by id


usersRouter.patch("/:id", verifyUser, validateUserUpdate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as IUserUpdate;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
}); //Update a user by id

usersRouter.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
}); //Delete a user by id


export default usersRouter; // create a post route for the user
