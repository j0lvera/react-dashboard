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
import { getRouteApi, useNavigate } from "@tanstack/react-router";

const contactListRouteApi = getRouteApi("/_layout/contacts");

const ContactsTable: ContactsTableComponent = ({
  data,
  pagination,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate({ from: "/contacts" });
  const { page: pageIndex, size: pageSize } = contactListRouteApi.useSearch();

  const { sorting, sortedItems, setSortField, setSortDirection } =
    useSorting<Contact>(data, "name");

  const {
    paginatedItems,
    // pagination,
    // totalItemCount,
    // pageSize,
    // pageIndex,
    // setPageSize,
    // setPageIndex,
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
      onClick: (contact: Contact) => {
        console.info("Edit", contact.name);
        onEdit?.(contact);
      },
    },
    {
      name: "Delete",
      type: "icon",
      description: "Delete contact",
      icon: "trash",
      color: "danger",
      onClick: (contact: Contact) => {
        console.info("Delete", contact.name);
        onDelete?.(contact);
      },
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
      (async () => {
        await navigate({
          search: (prev) => ({
            ...prev,
            page: index,
            size,
          }),
        });
      })();
    }

    if (sort) {
      const { field, direction } = sort;
      setSortField(field);
      setSortDirection(direction);
    }
  };

  const resultsCount =
    pagination?.total === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
        </strong>{" "}
        of {pagination?.total}
      </>
    );

  const serverPagination = {
    pageIndex, // current page index, i.e., ?page=1
    pageSize, // number of items per page, i.e., ?size=10
    totalItemCount: pagination?.total ?? 0, // from header range, e.g., 3-5/10
    pageSizeOptions: [3, 5, 8],
  };

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
        pagination={serverPagination}
        selection={selection}
      />
    </>
  );
};

export { ContactsTable };
