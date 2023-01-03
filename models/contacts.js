const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function writeContactData(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "\t"));
  } catch (error) {
    console.log("error.writeContactData", error);
  }
}

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    const parsedContactList = JSON.parse(contactList);
    return parsedContactList;
  } catch (error) {
    console.log("error.listContacts", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const contactById = contactList.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (error) {
    console.log("error.getContactById", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactList = await listContacts();
    const removedContact = contactList.find(
      (contact) => contact.id === contactId.toString()
    );
    const updatedContactList = contactList.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await writeContactData(updatedContactList);

    return removedContact;
  } catch (error) {
    console.log("error.removeContact", error);
  }
};

const addContact = async (body) => {
  try {
    const id = nanoid();

    const newContact = { id, ...body };
    console.log(newContact);
    const contactList = await listContacts();
    const updatedContactList = [newContact, ...contactList];
    await writeContactData(updatedContactList);
    return newContact;
  } catch (error) {
    console.log("error.addContact", error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactList = await listContacts();
    const index = contactList.findIndex(
      (item) => item.id === contactId.toString()
    );
    if (index === -1) {
      return null;
    }
    contactList[index] = { id: contactId, ...body };
    await writeContactData(contactList);
    return contactList[index];
  } catch (error) {
    console.log("error.addContact", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
