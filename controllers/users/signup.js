const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

require("dotenv").config();

const { PORT = 3000 } = process.env;

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Registration confirmation on the website",
    text: "http://localhost:3000/api/users/verify/m2ocqoxdhmv90Lo5ELj9v",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };

  await sendEmail(mail);

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
