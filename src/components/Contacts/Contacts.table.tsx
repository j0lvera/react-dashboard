import { EuiBasicTable, EuiBasicTableColumn } from "@elastic/eui";
import type { Contact, ContactsTableComponent } from "./Contacts.type.ts";
import { EuiTableFieldDataColumnType } from "@elastic/eui/src/components/basic_table/table_types";

const ContactsTable: ContactsTableComponent = ({ data }) => {
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

  return (
    <EuiBasicTable
      tableCaption={"Contacts table"}
      items={data}
      rowHeader={"name"}
      rowProps={getRowProps}
      cellProps={getCellProps}
      columns={columns}
    />
  );
};

export { ContactsTable };
