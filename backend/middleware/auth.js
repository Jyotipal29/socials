const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token header

      token = req.headers.authorization.split(" ")[1];

      //verify token

      const decoded = jwt.verify(token, process.env.JWT_SEC);
      //get user from  token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json({ message: error.message });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized" });
  }
});
module.exports = { protect };
