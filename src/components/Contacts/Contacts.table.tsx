import { useState } from "react";
import {
  Criteria,
  EuiTableFieldDataColumnType,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiText,
  EuiSpacer,
  EuiHorizontalRule,
} from "@elastic/eui";
import type { Contact, ContactsTableComponent } from "./Contacts.type.ts";

const ContactsTable: ContactsTableComponent = ({ data }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  const columns: EuiBasicTableColumn<Contact>[] = [
    {
      field: "name",
      name: "Name",
      // mobileOptions: {
      //   render: (contact: Contact) => <div></div>
      // }
    },
    {
      field: "age",
      name: "Age",
    },

    {
      field: "address",
      name: "Address",
    },
    {
      field: "role",
      name: "Role",
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
  const onTableChange = ({ page }: Criteria<Contact>) => {
    if (page) {
      const { index, size } = page;
      setPageIndex(index);
      setPageSize(size);
    }
  };

  // Manually handle pagination
  const findContacts = (
    contacts: Contact[],
    pageIndex: number,
    pageSize: number,
  ) => {
    let pageOfItems;
    const len = contacts.length;

    if (!pageIndex && !pageSize) {
      pageOfItems = contacts;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = contacts.slice(
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
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
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
        pagination={pagination}
      />
    </>
  );
};

export { ContactsTable };
