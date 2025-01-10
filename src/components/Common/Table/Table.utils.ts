import { useState } from "react";
import { Comparators, EuiTableSortingType } from "@elastic/eui";

type SortFn = <T>(
  items: T[],
  sortField: keyof T,
  sortDirection: "asc" | "desc",
) => T[];

const sort: SortFn = <T>(
  items: T[],
  sortField: keyof T,
  sortDirection: "asc" | "desc",
) => {
  let sortedItems;

  if (sortField) {
    sortedItems = items
      .slice(0)
      .sort(
        Comparators.property(sortField, Comparators.default(sortDirection)),
      );
  } else {
    sortedItems = items;
  }

  return sortedItems;
};

const useSorting = <T>(
  data: T[],
  defaultSortField: keyof T,
  sortFn: SortFn = sort,
) => {
  const [sortField, setSortField] = useState<keyof T>(defaultSortField);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedItems = sortFn(data, sortField, sortDirection);

  const sorting: EuiTableSortingType<T> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  return {
    sortedItems,
    sorting,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
  };
};

const paginate = <T>(items: T[], pageIndex: number, pageSize: number) => {
  let pageOfItems;
  const len = items.length;

  if (!pageIndex && !pageSize) {
    pageOfItems = items;
  } else {
    const startIndex = pageIndex * pageSize;
    pageOfItems = items.slice(startIndex, Math.min(startIndex + pageSize, len));
  }

  return {
    pageOfItems,
    totalItemCount: len,
  };
};

const usePagination = <T>(items: T[], defaultPageSize: number = 0) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const { pageOfItems, totalItemCount } = paginate<T>(
    items,
    pageIndex,
    pageSize,
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  return {
    paginatedItems: pageOfItems,
    totalItemCount,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    pagination,
  };
};

export { usePagination, useSorting };
