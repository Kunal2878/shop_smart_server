import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from '../models/User.js';
import  {secretKey}  from '../config.js';
async function registerUser(req, res) {
  try {
    const { username, password, Email } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      Email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const loginUser = async (req, res) => {
  try {
    const { Email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ Email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h'});
    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }};

//check email for sending otp



const getUserProfile = async (req, res) => {
  try {
    // Get user ID from the request
    const {Email} = req.body; // Assuming the userId is stored in the token's payload
console.log(Email);
    // Find the user in the database
    const user = await User.findById(Email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's profile data to the frontend
    else{
    res.json({
      username: user.username,
      Email: user.Email,
      // Include other fields as needed
    });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  registerUser,
  loginUser,
  getUserProfile
};
