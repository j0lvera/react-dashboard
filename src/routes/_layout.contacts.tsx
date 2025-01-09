import { createFileRoute } from "@tanstack/react-router";
import { ContactsList } from "../components/Contacts";
import { fetchContacts } from "../components/Contacts/Contacts.api.ts";

export const Route = createFileRoute("/_layout/contacts")({
  loader: fetchContacts,
  component: ContactsList,
});
