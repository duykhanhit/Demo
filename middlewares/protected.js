const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports.protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization) {
    token = req.headers.authorization;
  }


  if(!token) {
    return next(new Error(`Không có token.`, 401));
  }

  try {
    const decoded = jwt.verify(token, 'abab');

    req.user = await db.user.findByPk(decoded.user.id);
    next();

  } catch (err) {
    console.log(err);
    return next(new Error(`Bạn không có quyền truy cập.`, 401));
  }
}