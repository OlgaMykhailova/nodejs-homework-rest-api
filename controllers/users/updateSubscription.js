const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    code: 200,
    user: {
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;
