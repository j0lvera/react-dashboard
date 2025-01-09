import { queryOptions, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "../../api.ts";
import {
  CONTACTS_QUERY_KEY,
  CONTACTS_MUTATION_KEY,
  CONTACTS_API_URL,
} from "./Contacts.constants.ts";
import type { Contact, ContactCreate } from "./Contacts.type.ts";

const fetchContacts = async () => {
  const res: AxiosResponse<Contact[]> = await api.get(CONTACTS_API_URL);
  return res.data;
};

const contactsQueryOptions = queryOptions({
  queryKey: [CONTACTS_QUERY_KEY],
  queryFn: () => fetchContacts(),
});

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

export { fetchContacts, contactsQueryOptions, useCreateContact };
