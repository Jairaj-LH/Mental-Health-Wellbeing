const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      age: req.body.age,
      profile_picture: req.body.profile_picture
    });
    console.log('1');
    const newUser = await user.save();
    console.log('2');
    res.status(201).json(newUser);
    console.log('3');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const jwt = require('jsonwebtoken');

// Assuming you have your JWT_SECRET in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Make sure to keep your secret key safe

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // User found and password is correct
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 24 hours
      );

      res.json({ message: 'Login successful', token: token, user });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Email or password is incorrect' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const axios = require('axios');

exports.updateUserWithAnswers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // First, call the prediction API to get stress, anxiety, and depression levels
    const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', {
      answers: req.body.answers  // Sending answers to the prediction API
    });

    // Check if the prediction API responded properly
    if (predictionResponse.status !== 200) {
      return res.status(500).json({ message: 'Failed to get prediction from API' });
    }

    // Update the user data with new answers and health levels
    user.answers = req.body.answers;
    user.stress_level = predictionResponse.data.predictions.STRESS_LEVEL[0];
    user.anxiety_level = predictionResponse.data.predictions.ANXIETY_LEVEL[0];
    user.depression_level = predictionResponse.data.predictions.DEPRESSION_LEVEL[0];
    console.log(user);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    // Include more detailed error handling, potentially splitting try/catch blocks for finer error control
    res.status(500).json({ message: err.message });
  }
};