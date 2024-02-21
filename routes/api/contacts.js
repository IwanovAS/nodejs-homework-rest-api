const express = require("express");
const router = express.Router();

const {
  isValid,
  validBody,
  isEmpty,
  authenticate,
} = require("../../middlewares");

const { schema, upgradeFavoriteSchema } = require("../../schema/schema");

const {
  getListContacts,
  getContactId,
  addContact,
  delContact,
  updateContact,
  updateFavoriteContact,
} = require("../../controllers/contacts");

router.get("/", authenticate, getListContacts);

router.get("/:id", authenticate, isValid, getContactId);

router.post("/", authenticate, validBody(schema), addContact);

router.delete("/:id", authenticate, isValid, delContact);

router.put(
  "/:id",
  authenticate,
  isValid,
  isEmpty.isEmptyBody,
  validBody(schema),
  updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValid,
  isEmpty.isEmptyFavorite,
  validBody(upgradeFavoriteSchema),
  updateFavoriteContact
);

module.exports = router;
