var express = require('express');
const { post } = require('.');

var router = express.Router();
var User = require('../models/User');

router.post('/register', async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    console.log(user);
    return res.status(200).json({ user });
  } catch (error) {
    return error;
  }
});

router.post('/login', async (req, res, next) => {
  var { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: ' email/Password required' });
  }

  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email not register' });
    }
  } catch (error) {
    return error;
  }

  var result = await user.verifyPassword(password);
  console.log(result, 'aman');
  if (!result) {
    return res.status(401).json({ error: 'password is wrong' });
  }
});

module.exports = router;
