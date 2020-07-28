const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwtCookie;
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'f20109237f18715dfde3b12696c753568eee175cdb71d317271b0cb8fa0376e8');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
