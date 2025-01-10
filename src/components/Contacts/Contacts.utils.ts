import type { ContactsPagination } from "./Contacts.type.ts";
// parses the Content-Range header from a response
const parseRange = (contentRange: string): ContactsPagination => {
  const [range, total] = contentRange.split("/");
  const [start, end] = range.split("-").map(Number);
  const totalItems = Number(total);

  return {
    start,
    end,
    total: totalItems,
  };
};

export { parseRange };
