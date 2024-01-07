import { RequestHandler } from "express";
import  ApplicationError  from "../../Errors/appliction-error"
import jwt from "jsonwebtoken";
import { RequestUser } from "../../@types/express";
import  User  from "../../DB/Model/user.model";

export const verifyIsBusiness: RequestHandler = async (req, res, next) => {
  //get the Auth header:
  const header = req.headers.authorization;

  // if auth header does not exist - throw
  if (!header) {
    throw new ApplicationError(400, "No Auth Header");
  }

  //get the token from the header (after the space)
  const token = header.split(" ")[1];

  const secret = process.env.JWT_SECRET ?? "";

  try {
    //verify the token:
    const payload = jwt.verify(token, secret) as RequestUser;

    //pass the data to req.user
    req.user = payload;

    const user = await User.findById(req.user?.id);
    if (user?.isBusiness === true) {
      next();
    } else {
      next(new ApplicationError(403, "You are not a business"));
    }
  } catch (e) {
    next(e);
  }
};