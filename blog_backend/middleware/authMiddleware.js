const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { model } = require("mongoose");
const protectRoute = asyncHandler(async (req, res, next) => {
  // init token
  let token;
  // check there is an authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from req header
      let token = req.headers.authorization.split(" ")[1];
      // Verify the token
      // We generated token with id so we can find a user with it
      // verify(token, .env variable)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token =>" + decodedToken);
      // this gave us the user id
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized no token");
  }
});
module.exports = { protectRoute };
