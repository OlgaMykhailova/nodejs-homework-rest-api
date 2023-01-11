const express = require("express");

const { isValidId, validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.userSignUpSchema),
  ctrlWrapper(ctrl.signup)
);

router.post(
  "/login",
  validation(schemas.userLoginSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
