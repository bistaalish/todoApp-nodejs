// routes/auth.js

const express = require('express');
const router = express.Router();
const {checkAuth} = require("../middlewares/checkAuth")

const UserController = require('../controllers/UsersController');

// POST route for user registration
router.post('/register', UserController.register);

// POST route for user login
router.post('/login', UserController.login);

// GET route for user profile
router.get('/profile',checkAuth,UserController.profile)

module.exports = router;
