import {
  queryOptions,
  useMutation,
  keepPreviousData,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../../api.ts";
import {
  CONTACTS_QUERY_KEY,
  CONTACTS_MUTATION_KEY,
  CONTACTS_API_URL,
} from "./Contacts.constants.ts";
import type { Contact, ContactCreate, ContactUpdate } from "./Contacts.type.ts";
import { parseRange } from "./Contacts.utils.ts";

// GET requests

const fetchContacts = async (page: number, size: number) => {
  const offset = page * size;
  const res: AxiosResponse<Contact[]> = await api.get(CONTACTS_API_URL, {
    params: {
      offset,
      limit: size,
    },
    // REQUIRED for pagination
    headers: {
      Prefer: "count=exact",
    },
  });

  // we need to parse the range header to get the total number of contacts
  const range = res.headers["content-range"];
  const pagination = parseRange(range);

  return {
    data: res.data,
    pagination,
  };
};

const contactsQueryOptions = (page: number, size: number) =>
  queryOptions({
    queryKey: [CONTACTS_QUERY_KEY, page, size],
    queryFn: () => fetchContacts(page, size),
    placeholderData: keepPreviousData,
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

const patchContact = async (contact: ContactUpdate) => {
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
    mutationFn: (contact: Contact) => patchContact(contact),
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
