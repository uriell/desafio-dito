module.exports = function Util(controller) {
  return async function Controller(req, res) {
    try {
      await controller(req, res);
    } catch (err) {
      // possibilidades: log rotation?
      return res.status(200).json(res.generateErrorResponse(5000));
    }
  }
};