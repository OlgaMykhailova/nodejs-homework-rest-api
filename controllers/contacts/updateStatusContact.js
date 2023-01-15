const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate({_id: contactId, owner: _id}, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
