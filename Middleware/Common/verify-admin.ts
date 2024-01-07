import { RequestHandler } from "express";
import  ApplicationError from "../../Errors/appliction-error";
import jwt from 'jsonwebtoken'
import { RequestUser } from "../../@types/express";

export const verifyAdmin: RequestHandler = (req, res, next) => {

  const header = req.headers.authorization;     //get the Auth header:

  if (!header) {
    throw new ApplicationError(400, "No Auth Header");
  }   // if auth header does not exist - throw an error

  //get the token from the header (after the space)
  const token = header.split(" ")[1];  // get the token from the header
  const secret = process.env.JWT_SECRET ?? "";  // get the secret from the env file

  try {
    //verify the token:
    const payload = jwt.verify(token, secret) as RequestUser;
    req.user = payload;

    if(req.user?.isAdmin){
    next();
    } else {
      throw new ApplicationError(401, "You are not an admin")   
    }
    }
  catch(e){
    next(e)
  }
};