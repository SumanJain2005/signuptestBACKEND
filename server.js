const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Add this model file next

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/auth-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }
    res.send('Logged in');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
