import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// MODELS
// ==============================================
import User from '../models/user';

// ROUTE
// ==============================================
router.post('/register', async (req, res, next) => {
  try {
    if (!req.body.password) {
      return next({ message: 'Password field is required' });
    }
    if (req.body.password.length < 6) {
      return next({
        message: 'Your password must be at least 6 characters long'
      });
    }

    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword
    });

    const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).json({ token: token });
  } catch (error) {
    if (error.code === 11000) {
      return next({ message: 'Username not available' });
    }
    return next(error);
  }
});

module.exports = router;
