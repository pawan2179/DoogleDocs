import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"
import env from "./config/env.config";
import db from "./db/models";
import router from "./routes";
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler";

const result = dotenv.config();
console.log("Dotenv load result: ", result);

console.log(process.env.DATABASE_URL);

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
)
app.use(router);
app.use(errorHandler);
const port = env.PORT;

console.log("Runing program");
db.sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('Connection error:', err));

db.sequelize.sync();

app.get("/", (req: Request, res: Response) => {
  res.send("Express server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})