const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// SCHEMA
// ==============================================
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least {MINLENGTH} characters'],
    maxlength: [20, 'First name must be less than {MAXLENGTH} characters'],
    match: [
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
      'First name contains invalid charecters'
    ]
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least {MINLENGTH} characters'],
    maxlength: [20, 'Last name must be less than {MAXLENGTH} characters'],
    match: [
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
      'Last name contains invalid charecters'
    ]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    minlength: [3, 'Email address must be at least {MINLENGTH} characters'],
    maxlength: [254, 'Email address must be less than {MAXLENGTH} characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address provided'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least {MINLENGTH} characters'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/,
      'Password must contain an uppercase and lowercase letter and a number'
    ]
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role is invalid'
    },
    default: 'user'
  }
});

// MIDDLEWARE
// ==============================================

function formatName(string) {
  let lower = string.toLowerCase();
  let result = lower.charAt(0).toUpperCase() + lower.slice(1);
  return result;
}

user.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next({
      code: 403,
      message: 'Unauthorised password modification'
    });
  }

  try {
    const hash = await bcrypt.hashSync(this.password, 10);

    this.firstName = formatName(this.firstName);
    this.lastName = formatName(this.lastName);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// PRETTY ERROR MESSAGES
// =====================
user.post('save', function(error, doc, next) {
  if (error.code == 11000) {
    next({ code: 403, message: 'This email address is already registered' });
  }

  const errors = Object.keys(error.errors).map(key => {
    return error.errors[key].properties.message;
  });

  next({ code: 400, message: errors });
});

module.exports = mongoose.model('User', user);
