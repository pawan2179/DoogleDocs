import dotenv from 'dotenv'

dotenv.config();

if(
  process.env.NODE_ENV === undefined ||
  process.env.HOST === undefined ||
  process.env.PORT === undefined ||
  process.env.DATABASE_URL === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DB_PORT === undefined ||
  process.env.DATABASE === undefined ||
  process.env.HOST_EMAIL === undefined ||
  process.env.HOST_APP_PASSWORD === undefined
) {
  throw new Error("Environment variables missing.");
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  HOST_EMAIL: process.env.HOST_EMAIL,
  HOST_APP_PASSWORD: process.env.HOST_APP_PASSWORD
};
// console.log("Env file: ", env);
export default env;