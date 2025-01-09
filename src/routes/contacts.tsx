import { createFileRoute } from "@tanstack/react-router";
import { fetchContacts } from "../components/Contacts/Contacts.api.ts";
import { ContactsList } from "../components/Contacts";

export const Route = createFileRoute("/contacts")({
  loader: fetchContacts,
  component: ContactsList,
});
