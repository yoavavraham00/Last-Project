import express from "express";
import connect from "./DB/Utils/connection"; 
import usersRouter from "./Routes/users"; 
import cardsRouter from "./Routes/cards"; 
import logger from "./Middleware/Handelers/logger";
import notFound from "./Middleware/Handelers/Requests";
import errorHandler from "./Middleware/Handelers/error-handler";
import configEnv  from "./Env";
import cors from "cors";

configEnv(); // start the dotenv config
connect(); // start the connect function from Database/connect.ts
const app = express(); // start the express app

const PORT = process.env.EXPRESS_PORT || 3000; // get the Express port from the .env file

app.use(cors({origin:"http://localhost:3001"})); // const app to start using the cors middleware
app.use(express.json()); // const app to start using the Express.json() middleware
app.use(logger); // const app to start using the logger middleware
app.use(express.static("public")); // const app to start using the express.static() middleware
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler); // const app to start using the errorHandler middleware
app.use(notFound); // const app to start using the notFound middleware

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
}); // start the express app on the port 8686
