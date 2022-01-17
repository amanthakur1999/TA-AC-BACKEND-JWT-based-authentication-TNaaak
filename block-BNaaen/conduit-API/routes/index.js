var express = require('express');
var router = express.Router();
var User = require('../models/User');
var auth = require('../middelwares/Auth');
var bcrypt = require('bcrypt');
//Registration
router.post('/users', async (req, res, next) => {
  req.body.user.following = false;
  try {
    var user = await User.create(req.body.user);
    var token = await user.signToken();
    return res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});
//Authentication
router.post('/users/login', async (req, res, next) => {
  var { email, password } = req.body.user;
  if (!password || !email) {
    return res.status(400).json({ error: { body: 'Password/Email required' } });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: { body: 'Email is not registered' } });
    }
    var result = await user.verifypassword(password);
    if (!result) {
      return res.status(400).json({ error: { body: 'password is incorrect' } });
    }

    var token = await user.signToken();
    return res.status(201).json({ user: user.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

router.use(auth.verifyToken);
//Get Current User
router.get('/user/', async (req, res, next) => {
  // console.log(req);
  let id = req.user.userId;
  try {
    let user = await User.findById(id);
    res.status(200).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
});

//Update User
router.put('/user/', async (req, res, next) => {
  let id = req.user.userId;
  try {
    user = await User.findByIdAndUpdate(id, req.body.user);
    return res.status(201).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
});
module.exports = router;