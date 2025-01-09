import { PropsWithChildren, ReactElement } from "react";

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

// Modal types
interface ContactsModalProps extends PropsWithChildren {
  formId?: string;
  onClose?: () => void;
  onClick?: () => void;
}

type ContactsModalComponent = (
  props: ContactsModalProps,
) => ReactElement | null;

// Table types
interface ContactsTableProps {
  data: Contact[];
}

type ContactsTableComponent = (
  props: ContactsTableProps,
) => ReactElement | null;

// Form types
interface ContactsFormProps {
  id?: string;
  formId?: string;
}

type ContactsFormComponent = (props: ContactsFormProps) => ReactElement | null;

export { roles };
export type {
  Contact,
  ContactsModalProps,
  ContactsModalComponent,
  ContactsTableComponent,
  ContactsTableProps,
  ContactsFormComponent,
  ContactsFormProps,
};
