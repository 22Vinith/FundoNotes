import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD
  }
});

const sendEmail = async (email: string, token: string): Promise<void> => {
  const mailOptions = {
    from: {
      name: 'Fundoo Notes',
      address: process.env.EMAIL_USER
    },
    to: email,
    subject: 'Password Reset Token',
    html: `<p>Your password reset token is:</p><p><strong>${token}</strong></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendEmail };
