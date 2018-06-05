const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// MODELS
// ==============================================
const User = require('../models/user');

// ROUTE
// ==============================================
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return next({ code: 401, message: 'Incorrect login details' });
    }

    const payload = { id: user._id, role: user.role };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).send({ token: token });
  } catch (error) {
    return next({ code: 401, message: 'Incorrect login details' });
  }
});

module.exports = router;