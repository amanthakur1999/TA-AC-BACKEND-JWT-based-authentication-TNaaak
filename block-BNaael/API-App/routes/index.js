var express = require('express');
var router = express.Router();
var auth = require('../meddlewares/Auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected', auth.varifyToken, (req, res, next) => {
  console.log(req.user);
  res.json({ access: 'protected resource' });
});
module.exports = router;
