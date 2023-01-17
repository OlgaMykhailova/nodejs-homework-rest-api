const createError = require("http-errors");
require("dotenv").config();

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const { PORT = 3000 } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "User not found");
  }
  if (!user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Registration confirmation on the website",
    html: `<a href="http://localhost:${PORT}/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
