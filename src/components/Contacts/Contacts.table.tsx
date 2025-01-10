import { useState } from "react";
import {
  Comparators,
  Criteria,
  EuiTableFieldDataColumnType,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSortingType,
  EuiText,
  EuiSpacer,
  EuiHorizontalRule,
} from "@elastic/eui";
import type { Contact, ContactsTableComponent } from "./Contacts.type.ts";

const ContactsTable: ContactsTableComponent = ({ data }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [sortField, setSortField] = useState<keyof Contact>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const columns: EuiBasicTableColumn<Contact>[] = [
    {
      field: "name",
      name: "Name",
      sortable: true,
      // mobileOptions: {
      //   render: (contact: Contact) => <div></div>
      // }
    },
    {
      field: "age",
      name: "Age",
      sortable: true,
    },

    {
      field: "address",
      name: "Address",
      sortable: true,
    },
    {
      field: "role",
      name: "Role",
      sortable: true,
    },
  ];

  const getRowProps = (contact: Contact) => ({
    "data-test-subj": `row-${contact.id}`,
    className: "customRowClass",
    onClick: () => console.info("clicked", contact.name),
  });

  const getCellProps = (
    contact: Contact,
    column: EuiTableFieldDataColumnType<Contact>,
  ) => ({
    className: "customCellClass",
    "data-test-subj": `cell-${contact.id}-${column.field}`,
    textOnly: true,
  });

  // Pagination logic
  const onTableChange = ({ page, sort }: Criteria<Contact>) => {
    if (page) {
      const { index, size } = page;
      setPageIndex(index);
      setPageSize(size);
    }

    if (sort) {
      const { field, direction } = sort;
      setSortField(field);
      setSortDirection(direction);
    }
  };

  // Manually handle pagination
  const findContacts = (
    contacts: Contact[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof Contact,
    sortDirection: "asc" | "desc",
  ) => {
    let items;

    if (sortField) {
      items = contacts
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection)),
        );
    } else {
      items = contacts;
    }

    let pageOfItems;
    const len = contacts.length;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, len),
      );
    }

    return {
      pageOfItems,
      totalItemCount: len,
    };
  };

  const { pageOfItems, totalItemCount } = findContacts(
    data,
    pageIndex,
    pageSize,
    sortField,
    sortDirection,
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
        </strong>{" "}
        of {totalItemCount}
      </>
    );

  const sorting: EuiTableSortingType<Contact> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  return (
    <>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Users</strong>
      </EuiText>
      <EuiSpacer size={"s"} />
      <EuiHorizontalRule margin={"none"} style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption={"Contacts table"}
        items={pageOfItems}
        rowHeader={"name"}
        rowProps={getRowProps}
        cellProps={getCellProps}
        columns={columns}
        onChange={onTableChange}
        sorting={sorting}
        pagination={pagination}
      />
    </>
  );
};

export { ContactsTable };
