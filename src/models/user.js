import mongoose from 'mongoose';
import validate from 'mongoose-validator';

// VALIDATE
// ==============================================

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 20],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlpha',
    passIfEmpty: true,
    message: 'Invalid characters used in the name field'
  })
];

const usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 15],
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Invalid characters used in the username field'
  })
];

// SCHEMA
// ==============================================

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    validate: nameValidator
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username field is required'],
    validate: usernameValidator
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', user);
