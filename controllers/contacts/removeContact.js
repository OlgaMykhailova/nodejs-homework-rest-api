const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndRemove({_id: contactId, owner: _id});
  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id ${contactId} successfully deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeContact;
