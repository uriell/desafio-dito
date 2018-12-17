module.exports = function Middleware(req, res, next) {
  req.createdAt = Date.now();

  return next();
};