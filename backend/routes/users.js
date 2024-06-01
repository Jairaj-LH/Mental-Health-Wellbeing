const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to register a new user
router.post('/register', userController.registerUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to get user details
router.get('/:id', userController.getUser);

router.get('/',userController.getAllUsers);
// Route to update user information
router.put('/:id', userController.updateUser);

// New route to update user answers and health levels
router.put('/update-answers/:id', userController.updateUserWithAnswers);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
