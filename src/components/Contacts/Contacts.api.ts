import { queryOptions, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../../api.ts";
import {
  CONTACTS_QUERY_KEY,
  CONTACTS_MUTATION_KEY,
  CONTACTS_API_URL,
} from "./Contacts.constants.ts";
import type { Contact, ContactCreate, ContactUpdate } from "./Contacts.type.ts";

// GET requests

const fetchContacts = async () => {
  const res: AxiosResponse<Contact[]> = await api.get(CONTACTS_API_URL);
  return res.data;
};

const contactsQueryOptions = queryOptions({
  queryKey: [CONTACTS_QUERY_KEY],
  queryFn: () => fetchContacts(),
});

// POST requests

const postContacts = async (contact: ContactCreate) => {
  const res: AxiosResponse<Contact> = await api.post(CONTACTS_API_URL, contact);
  return res.data;
};

const useCreateContact = () => {
  return useMutation({
    mutationKey: [CONTACTS_MUTATION_KEY],
    mutationFn: (contact: ContactCreate) => postContacts(contact),
  });
};

// PATH requests

const putContacts = async (contact: ContactUpdate) => {
  const id = contact.id;
  // we must remove id from contact, otherwise the API will throw an error
  // because it will try to update the id field, and it's a read-only (identity) field
  delete contact.id;
  const res: AxiosResponse<ContactUpdate> = await api.patch(
    CONTACTS_API_URL,
    contact,
    {
      params: {
        id: `eq.${id}`,
      },
    },
  );
  return res.data;
};

const useUpdateContact = () => {
  return useMutation({
    mutationKey: [CONTACTS_MUTATION_KEY, "UPDATE"],
    mutationFn: (contact: Contact) => putContacts(contact),
  });
};

// DELETE requests

const deleteContacts = async (contact: Contact) => {
  const id = contact.id;
  const res: AxiosResponse<Contact> = await api.delete(CONTACTS_API_URL, {
    params: {
      id: `eq.${id}`,
    },
  });
  return res.data;
};

const useDeleteContact = () => {
  return useMutation({
    mutationKey: [CONTACTS_MUTATION_KEY, "DELETE"],
    mutationFn: (contact: Contact) => deleteContacts(contact),
  });
};

export {
  fetchContacts,
  contactsQueryOptions,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
};
