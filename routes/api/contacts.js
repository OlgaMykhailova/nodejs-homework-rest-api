const express = require("express");

const { auth, isValidId, validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validation(schemas.addContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(schemas.addContactSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
