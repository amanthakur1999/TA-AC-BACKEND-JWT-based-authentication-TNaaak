var jwt = require('jsonwebtoken');

module.exports = {
  varityToken: async (req, res, next) => {
    console.log(req.headers);
    var token = req.headers.authorization;
    try {
      if (token) {
        var payload = await jwt.varity(token, 'thisissecrte');
        req.user = payload;
        next();
      } else {
        res.status(400).json({ error: 'Token Required' });
      }
    } catch (error) {
      next(error);
    }
  },
};
