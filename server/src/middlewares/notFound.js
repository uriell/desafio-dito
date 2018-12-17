module.exports = async function Middleware(req, res) {
  const message = `The endpoint specified (${req.path}) was not found or does not accept this method (${req.method}).`;

  return res.status(200)
    .json(res.generateErrorResponse(4040, message));
};