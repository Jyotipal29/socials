const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const register = async (req, res) => {
  let { name, email, password, picturePath } = req.body["formData"];
  // picturePath = JSON.stringify(picturePath);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }

  //check if user exist
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    picturePath,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      picturePath,
    });
  } else {
    res.status(400);
    throw new Error("invalid error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({
    email,
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid users");
  }
};

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SEC,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  register,
  login,
};