import jwt from 'jsonwebtoken';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return next({ message: 'Incorrect login details' });
  }
};
