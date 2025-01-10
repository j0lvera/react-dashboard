import { createFileRoute } from "@tanstack/react-router";
import { ContactsList } from "../components/Contacts";
import { contactsQueryOptions } from "../components/Contacts/Contacts.api.ts";

type ContactsListSearch = {
  page: number;
  size: number;
};

export const Route = createFileRoute("/_layout/contacts")({
  validateSearch: (search: Record<string, unknown>): ContactsListSearch => {
    return {
      page: Number(search?.page ?? 1),
      size: Number(search.size ?? 8),
    };
  },
  loaderDeps: ({ search: { page, size } }) => {
    return {
      page,
      size,
    };
  },
  loader: ({ context: { queryClient }, deps }) => {
    console.log("deps", deps);
    return queryClient.ensureQueryData(
      contactsQueryOptions(deps.page, deps.size),
    );
  },
  component: ContactsList,
});
