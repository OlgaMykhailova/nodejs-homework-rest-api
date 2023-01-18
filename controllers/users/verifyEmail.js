const createError = require("http-errors");
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, "User not found");
  }

  await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

  res.json({
    message: "Verification successful",
  });
};
module.exports = verifyEmail;
