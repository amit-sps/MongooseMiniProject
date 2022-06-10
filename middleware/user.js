const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.userMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send("token is required!");
    let token = authorization.split(" ");
    token = token[1].trim();

    const { _id } = await jwt.decode(token, process.env.tokenkey);

    if (!_id) return res.status(400).send("invalid token !");

    req._id = _id;
    next();
  } catch (err) {
    console.log(err);
  }
};
