import { ErrorRequestHandler } from "express";
import ApplicationError from "../../Errors/appliction-error";
import { CastError } from "mongoose";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.status).json({ message: err.message });
  }  //my error

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: err.message + "!", name: err.name });
  }  //json error

  const castError = err as CastError;
if (castError) {
  return res.status(400).json({ message: "Cast Error", castError });
}

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message, err, source: "other" });
  } //other error
  
  else {
    return res.status(500).json({ message: "Something went wrong" });
} //default error
};

export default errorHandler;
