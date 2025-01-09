import { EuiPageTemplate } from "@elastic/eui";
import { getRouteApi } from "@tanstack/react-router";
import { ContactsTable as Table } from "./Contacts.table.tsx";

const contactsRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const data = contactsRouteApi.useLoaderData();
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle={"Contacts"}
        description={"List of contacts"}
      />
      <EuiPageTemplate.Section>
        <Table data={data} />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
