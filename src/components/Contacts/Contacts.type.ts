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

// CRUD types
type ContactCreate = Omit<Contact, "id">;

// we must enforce that id is not optional
type ContactUpdate = Partial<ContactCreate> & Pick<Contact, "id">;

// Table types
interface ContactsTableProps {
  data: Contact[];
  pagination?: ContactsPagination;
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
}

type ContactsTableComponent = (
  props: ContactsTableProps,
) => ReactElement | null;

// Form types
interface ContactsFormProps {
  formId?: string;
  onSubmit?: (contact: ContactCreate) => void;
  defaultValues?: ContactCreate;
  isLoading?: boolean;
}

type ContactsFormComponent = (props: ContactsFormProps) => ReactElement | null;

// Misc
interface ContactsPagination {
  start: number;
  end: number;
  total: number;
}

export { roles };
export type {
  Contact,
  ContactCreate,
  ContactUpdate,
  ContactsTableComponent,
  ContactsTableProps,
  ContactsFormComponent,
  ContactsFormProps,
  ContactsPagination,
};
