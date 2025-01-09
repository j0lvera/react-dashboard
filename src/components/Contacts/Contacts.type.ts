const roles = {
  ADMIN: "admin",
  EDITOR: "editor",
  AUTHOR: "author",
  CONTRIBUTOR: "contributor",
  SUBSCRIBER: "subscriber",
} as const; // tell TS to use values as literal vs string

type Role = (typeof roles)[keyof typeof roles];

interface Contacts {
  id?: string;
  name: string;
  address: string;
  role: Role;
  age: number;
}

export { roles };
export type { Contacts };
