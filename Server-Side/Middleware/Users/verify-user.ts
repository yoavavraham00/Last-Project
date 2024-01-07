import { RequestHandler } from "express";
import  ApplicationError  from "../../Errors/appliction-error"
import jwt from "jsonwebtoken";
import { RequestUser } from "../../@types/express";

export const verifyUser: RequestHandler = (req, res, next) => {
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
      const payload = jwt.verify(token, secret) as RequestUser; //get the payload from the token
  
      req.user = payload;
       console.log(req.user.id) 
       console.log(req.params.id);
      if (req.params.id === req.user?.id) {
        return next();
      } //if the user is the same as the requested user -> next

      throw new ApplicationError(
        401,
        "Only the specific registered user can access"
      ); //if not - throw error
    } catch (e) {
      next(e);
    }
  };