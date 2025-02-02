const {Users} = require('../db/usersModel');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const { Unauthorized } = require("http-errors");

const authenticate = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
  
      if (!authorization) {
        res.status(401).json({
          contentType: "application/json",
          ResponseBody: { message: "Not authorized" },
        });
      }
      const [bearer, token] = authorization.split(" ");
      if (bearer !== "Bearer") {
        throw new Unauthorized("Not authorized");
      }
      jwt.verify(token, JWT_SECRET);
      const user = await Users.findOne({ token });
      if (!user) {
        throw new Unauthorized("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      if (!error.status) {
        error.status = 401;
        error.message = "Not authorized!!!";
      }
      next(error);
    }
  };
  
  module.exports = authenticate;