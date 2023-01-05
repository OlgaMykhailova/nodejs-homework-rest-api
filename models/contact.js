const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSchemaValidationErrors = require("../helpers/handleSchemaValidationErrors");

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

contactSchema.post("save", handleSchemaValidationErrors);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
      'any.required': `Missing field favorite`
  }),
});

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
