const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors());
// Use routes
const usersRouter = require('./routes/users');


app.use('/users', usersRouter);
//app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Mental Health API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
