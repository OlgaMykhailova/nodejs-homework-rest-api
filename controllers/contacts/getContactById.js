const { Contact } = require("../../models");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId)
  const { _id } = req.user;
  const result = await Contact.findOne({_id: contactId, owner: _id});
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

module.exports = getContactById;
