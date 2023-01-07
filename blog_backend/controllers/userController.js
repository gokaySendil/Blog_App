const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  // Get the user data from body
  const { username, email, password } = req.body;
  // Check any of the fields invalid
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // Check if the user already exsist
  const foundbyName = await User.findOne({ username });
  const foundbyEmail = await User.findOne({ email });
  if (foundbyEmail || foundbyName) {
    res.status(400);
    throw new Error("User alreay Exsist");
  }

  // Create the user
  // Generate hashed password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  //Create user in mongodb
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // if user is created successfuly return respond
  // Do not forget JWT
  if (createdUser) {
    res.status(201);
    res.json({
      _id: createdUser.id,
      username: createdUser.username,
      email: createUser.email,
      token: getJTWToken(createUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let foundUser;
  // Get use data from body
  const { loginMethod, password } = req.body;
  // Check the data is empty or not
  if (!loginMethod || !password) {
    res.status(400);
    throw new Error("Invalid Credantials");
  }
  // check the req.body to which input email or username
  if (validateEmail(loginMethod)) {
    // find a user with that  email
    foundUser = await User.findOne({ email: loginMethod });
  } else {
    // find a user with that username
    foundUser = await User.findOne({ username: loginMethod });
  }
  if (foundUser) {
    // compare password with hash
    const validPassword = await bcrypt.compare(password, foundUser.password);

    // if password is matching then generate token
    if (validPassword) {
      // return the respond
      res.status(201).json({
        _id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        token: getJTWToken(foundUser.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } else {
    res.status(404);
    throw new Error("There is no user");
  }
});
const getJTWToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const validateEmail = (email) => {
  // it validates parameter is an email or not
  // İts a RE(Regular Expression)
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = { getUser, createUser, loginUser };
