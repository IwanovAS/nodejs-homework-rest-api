const Contact = require("../models/contactModel");

const listContacts = async (query, pagination) => {
  const contacts = await Contact.find(query, "", pagination).populate(
    "owner",
    "email"
  );

  return contacts;
};

const getContactById = async (id, owner) => {
  const contact = await Contact.findOne({ _id: id, owner });

  return contact;
};

const createContact = async (body) => {
  const newContact = await Contact.create(body);

  return newContact;
};

const upgradeContact = async (id, owner, body) => {
  const updateContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    body,
    {
      new: true,
    }
  );

  return updateContact;
};

const upgradeFavorite = async (id, owner, body) => {
  const updateFavorite = await Contact.findOneAndUpdate(
    { _id: id, owner },
    body,
    {
      new: true,
    }
  );
  
  return updateFavorite;
};

const removeContact = async (id, owner) => {
  const deleteContact = await Contact.findOneAndDelete({ _id: id, owner });

  return deleteContact;
};

module.exports = {
  listContacts,
  getContactById,
  createContact,
  upgradeContact,
  upgradeFavorite,
  removeContact,
};
