const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// MODELS
// ==============================================
const User = require('../models/user');

// ROUTE
// ==============================================
router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    });

    const payload = { id: user._id, role: user.role };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).json({ token: token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;