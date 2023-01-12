const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSchemaValidationErrors = require("../helpers/handleSchemaValidationErrors");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .pattern(emailRegexp)
    .required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

contactSchema.post("save", handleSchemaValidationErrors);

const Contact = model("contact", contactSchema);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": `Missing field favorite`,
  }),
});

const schemas = {
  addContactSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
