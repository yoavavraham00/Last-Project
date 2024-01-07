import  morgan  from "morgan";
import chalk from "chalk";

const format = process.env.NODE_ENV == "production" ? "tiny" : "dev";

const logger = morgan((tokens, req, res) => {
    const method = chalk.green(tokens.method(req, res));
    const url = chalk.blue(tokens.url(req, res));
    const status = chalk.blackBright(tokens.status(req, res));
    const responseTime = chalk.cyanBright(tokens['response-time'](req, res) + ' ms');
  
    return `${method} ${url} ${status} ${responseTime}`;
  });
  
  export default logger;


