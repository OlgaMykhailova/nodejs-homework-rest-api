const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId)
  const isCorrect = isValidObjectId(contactId);
  if (!isCorrect) {
    const error = createError(400, `Id ${contactId} has incorrect format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
