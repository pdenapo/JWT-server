const express = require('express');
const router = express.Router();

// MODELS
// ==============================================
const User = require('../models/user');

// MIDDLEWARE
// ==============================================
const checkAuth = require('../middleware/checkAuth');

// ROUTE
// ==============================================
router.get('/user', checkAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
