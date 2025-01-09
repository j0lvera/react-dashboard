import { AxiosResponse } from "axios";
import { api } from "../../api.ts";
import { CONTACTS_API_URL } from "./Contacts.constants.ts";
import type { Contact } from "./Contacts.type.ts";

const fetchContacts = async () => {
  const res: AxiosResponse<Contact[]> = await api.get(CONTACTS_API_URL);
  return res.data;
};

export { fetchContacts };
