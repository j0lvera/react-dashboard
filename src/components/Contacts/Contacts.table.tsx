import {
  Criteria,
  EuiTableFieldDataColumnType,
  EuiBasicTable,
  EuiBasicTableColumn,
  DefaultItemAction,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiHorizontalRule,
} from "@elastic/eui";
import type { Contact, ContactsTableComponent } from "./Contacts.type.ts";
import { usePagination, useSorting, useSelection } from "../Common/Table";

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

  // TODO:
  // - [ ] e.g., return contact.role === "subscriber"
  const selectable = () => true;
  const { selection, selectedItems } = useSelection<Contact>(selectable);

  const actions: DefaultItemAction<Contact>[] = [
    {
      name: "Edit",
      type: "icon",
      description: "Edit contact",
      icon: "pencil",
      color: "text",
      onClick: (contact: Contact) => console.info("Edit", contact.name),
    },
    {
      name: "Delete",
      type: "icon",
      description: "Delete contact",
      icon: "trash",
      color: "danger",
      onClick: (contact: Contact) => console.info("Delete", contact.name),
    },
  ];

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
      truncateText: true,
    },
    {
      field: "role",
      name: "Role",
      sortable: true,
    },
    {
      name: "Actions",
      actions,
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
      <EuiFlexGroup justifyContent={"spaceAround"}>
        <EuiFlexItem>
          <EuiText size="xs">
            Showing {resultsCount} <strong>Users</strong>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size={"xs"}>
            Selected <strong>{selectedItems?.length}</strong>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size={"s"} />
      <EuiHorizontalRule margin={"none"} style={{ height: 2 }} />
      <EuiBasicTable
        tableCaption={"Contacts table"}
        items={paginatedItems}
        itemId={"id"}
        rowHeader={"name"}
        rowProps={getRowProps}
        cellProps={getCellProps}
        columns={columns}
        onChange={onTableChange}
        sorting={sorting}
        pagination={pagination}
        selection={selection}
      />
    </>
  );
};

export { ContactsTable };
