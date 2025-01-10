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
import { usePagination, useSorting } from "../Common/Table";

const ContactsTable: ContactsTableComponent = ({ data }) => {
  const { sorting, sortedItems, setSortField, setSortDirection } =
    useSorting<Contact>(data, "name");

  const {
    paginatedItems,
    pagination,
    totalItemCount,
    pageSize,
    pageIndex,
    setPageSize,
    setPageIndex,
  } = usePagination<Contact>(sortedItems, 8);

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
        items={paginatedItems}
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
