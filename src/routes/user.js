import express from 'express';

const router = express.Router();

// MODELS
// ==============================================
import User from '../models/user';

// MIDDLEWARE
// ==============================================
const checkAuth = require('../middleware/checkAuth');

// ROUTE
// ==============================================
router.get('/user', checkAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    res.status(200).json({
      name: user.name,
      username: user.username
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
