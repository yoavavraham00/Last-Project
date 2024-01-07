import { config } from "dotenv";

// our function:
const configEnv = () => {
  //NODE_ENV אפשר להגדיר משתנה בשם
  //"dev" משתנה עם ברירת מחדל של
  const env = process.env.NODE_ENV || "dev";

  config({
    path: `Env/.${env}.env`,
  });
};

export default configEnv;