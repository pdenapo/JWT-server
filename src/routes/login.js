import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// MODELS
// ==============================================
import User from '../models/user';

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
      return next({ message: 'Incorrect login details' });
    }

    const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400
    });

    res.status(200).send({ token: token });
  } catch (error) {
    return next({ message: 'Incorrect login details' });
  }
});

module.exports = router;
