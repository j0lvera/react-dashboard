import { ReactElement } from "react";

const roles = {
  Admin: "admin",
  Editor: "editor",
  Author: "author",
  Contributor: "contributor",
  Subscriber: "subscriber",
} as const; // tell TS to use values as literal vs string

type Role = (typeof roles)[keyof typeof roles];

interface Contact {
  id?: string;
  name: string;
  address: string;
  role: Role;
  age: number;
}

interface ContactsTableProps {
  data: Contact[];
}

type ContactsTableComponent = (
  props: ContactsTableProps,
) => ReactElement | null;

export { roles };
export type { Contact, ContactsTableComponent, ContactsTableProps };
