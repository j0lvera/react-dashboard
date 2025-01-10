// ensure that the sortField is a key of T, but also that it's a string
type SortField<T extends object> = Extract<keyof T, string>;

type SortFn = <T extends object>(
  items: T[],
  sortField: SortField<T>,
  sortDirection: "asc" | "desc",
) => T[];

type SelectableFn = <T>(item: T) => boolean;

export type { SortField, SortFn, SelectableFn };
