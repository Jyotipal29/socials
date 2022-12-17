const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const register = async (req, res) => {
  try {
    let { name, email, password, picturePath } = req.body["formData"];
    // picturePath = JSON.stringify(picturePath);

    if (!name || !email || !password || !picturePath) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    //check if user exist
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exist" });
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
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        picturePath,
      });
    } else {
      return res.status(400).json({ message: "Invalid user" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
      picturePath: user.picturePath,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Unautorized access" });
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
