const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

// DATABASE
// ==============================================
if (!process.env.DATABASE) {
  console.log('No database credentials found');
  process.exit();
}

mongoose.connect(process.env.DATABASE);

// CONFIG
// ==============================================
app.use(bodyParser.json());

// ROUTES
// ==============================================
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/user'));

// ERROR HANDLING
// ==============================================
app.use((error, req, res, next) => {
  res.status(error.code).json({ errors: error.message });
});

// START
// ==============================================
app.listen(port, host, () => {
  console.log(`Server started on ${host}:${port}`);
});
