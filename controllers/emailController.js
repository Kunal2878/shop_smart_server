import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from '../models/User.js';
import Otp from '../models/Otp.js';
import nodemailer from 'nodemailer'
import  {secretKey}  from '../config.js';

const checkemail = async (req, res) => {
  try {
    const { Email } = req.body;
    const token = jwt.sign({ Email: Email }, secretKey);
    console.log(token);
    // Check if the Email exists
    const existingEmail = await User.findOne({ Email });
    if (existingEmail) {
      // Generate a random 4-digit code for authentication
      const authenticationCode = Math.floor(1000 + Math.random() * 9000);
      console.log(authenticationCode);

      // Create a test account using Ethereal Email
      //const testAccount = await nodemailer.createTestAccount();

      // Create a transporter using the test account
      const transporter = nodemailer.createTransport({
        service: 'gmail',
      
        auth: {
          user: 'royr81860@gmail.com',
          pass: 'nfeplqsyhpgjwggo'
        }
      });

      // Define Email content
      const mailOptions = {
        from: 'royr81860@gmail.com',
        to: Email,
        subject: 'Authentication Code',
        text: `Your authentication code: ${authenticationCode}`
      };

      // Send the Email
      const info = await transporter.sendMail(mailOptions);

      // Output the Email URL for testing
      console.log('Authentication Code Email URL:', nodemailer.getTestMessageUrl(info));

      // Save the OTP and Email in the database
      const otpData = new Otp({
        otp: authenticationCode,
        email: Email
      });
      await otpData.save();

      setTimeout(async () => {
        await Otp.deleteMany({ email: Email });
        console.log('OTP data deleted');
      }, 5 * 60 * 1000); // 5 minutes in milliseconds

      res.status(200).json({ message: 'Email found', token: token });
    } else {
      res.status(404).json({ message: 'Email not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkotp = async (req, res) => {
  
  try {

    const {  enteredOtp } = req.body;

    // Fetch the stored OTP from the database
    const storedOtpData = await Otp.findOne({ otp: enteredOtp });

    if (storedOtpData) {
      res.status(200).json({ message: 'OTP is valid' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const changepassword = async (req, res) => {
  try {
    const { Email, newPassword } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export  default {checkemail,checkotp,changepassword};

