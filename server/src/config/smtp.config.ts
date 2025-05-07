import { createTransport } from 'nodemailer';

const transporter = createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'pawansingh4418@gmail.com',
    pass: 'testsmtppassword'
  },
  secure: true
});

export default transporter;