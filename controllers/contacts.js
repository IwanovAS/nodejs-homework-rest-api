const { HttpError } = require("../helpers");
const tryCatch = require("../helpers/tryCatch");

const {
  listContacts,
  getContactById,
  createContact,
  upgradeContact,
  upgradeFavorite,
  removeContact,
} = require("../db/services/contactServices");

const getListContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const contactsAll = await listContacts({owner});
  res.status(200).json(contactsAll);
};

const getContactId = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const contact = await getContactById(id, owner);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const {_id: owner} = req.user;
  const newContact = await createContact({...req.body, owner});
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const updateContactById = await upgradeContact(id, owner, req.body);
  if (!updateContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateContactById);
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  if (!req.body) {
    throw HttpError(400, "Missing field favorite");
  }
  const updateContactById = await upgradeFavorite(id, owner, req.body);
  if (!updateContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateContactById);
};

const delContact = async (req, res) => {
  const { id } = req.params;
  const {_id: owner} = req.user;
  const deletedContact = await removeContact(id, owner);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getListContacts: tryCatch(getListContacts),
  getContactId: tryCatch(getContactId),
  addContact: tryCatch(addContact),
  updateContact: tryCatch(updateContact),
  updateFavoriteContact: tryCatch(updateFavoriteContact),
  delContact: tryCatch(delContact),
};
