const express = require("express");

const { auth, validation } = require("../../middlewares");
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

router.get('/current', auth, ctrlWrapper(ctrl.getCurrentUser));

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.patch(
  "/",
  auth,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
