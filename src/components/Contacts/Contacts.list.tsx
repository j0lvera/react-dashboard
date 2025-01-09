import { useState } from "react";
import { EuiPageTemplate, EuiButton, useGeneratedHtmlId } from "@elastic/eui";
import { getRouteApi } from "@tanstack/react-router";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { ContactsModal } from "./Contacts.modal.tsx";

const contactsRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const showAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);

  const addModalFormId = useGeneratedHtmlId({ prefix: "addContactModalForm" });

  const data = contactsRouteApi.useLoaderData();
  return (
    <>
      {isAddModalVisible && (
        <ContactsModal formId={addModalFormId} onClose={closeAddModal}>
          <ContactsForm formId={addModalFormId} />
        </ContactsModal>
      )}
      <EuiPageTemplate.Header
        pageTitle={"Contacts"}
        description={"List of contacts"}
        rightSideItems={[
          <EuiButton onClick={showAddModal}>Add Contact</EuiButton>,
        ]}
      />
      <EuiPageTemplate.Section>
        <Table data={data} />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
