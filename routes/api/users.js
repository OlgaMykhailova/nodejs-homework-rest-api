const express = require("express");

const { auth, validation, uploadFile } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.userSignUpSchema),
  ctrlWrapper(ctrl.signup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.resendVerifyEmail));

router.post(
  "/verify",
  validation(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.verifyEmail)
);

router.post(
  "/login",
  validation(schemas.userLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  uploadFile.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
