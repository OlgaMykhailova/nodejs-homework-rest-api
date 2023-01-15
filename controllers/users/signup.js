const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    status: "201 Created",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
