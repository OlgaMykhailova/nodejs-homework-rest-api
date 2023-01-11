const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    favorite !== null ? { owner: _id, favorite } : { owner: _id },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
