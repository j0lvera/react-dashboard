import { EuiPageTemplate, EuiButton } from "@elastic/eui";
import { getRouteApi } from "@tanstack/react-router";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";

const contactsRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const data = contactsRouteApi.useLoaderData();
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle={"Contacts"}
        description={"List of contacts"}
        rightSideItems={[<EuiButton>Add Contact</EuiButton>]}
      />
      <EuiPageTemplate.Section>
        <ContactsForm />
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section>
        <Table data={data} />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
