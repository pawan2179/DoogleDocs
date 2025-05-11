import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_APP_PASSWORD
  },
});

export default transporter;