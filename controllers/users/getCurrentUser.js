const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "200 OK",
    code: 200,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrentUser;
