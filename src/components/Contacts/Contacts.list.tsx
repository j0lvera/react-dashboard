import { EuiPageTemplate, EuiButton } from "@elastic/eui";
import { getRouteApi } from "@tanstack/react-router";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { useModalUtils, Modal } from "../Common/Modal";

const contactsRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const {
    isVisible: isAddModalVisible,
    showModal: showAddModal,
    closeModal: closeAddModal,
    modalFormId: addModalFormId,
  } = useModalUtils("addModal");

  const data = contactsRouteApi.useLoaderData();
  return (
    <>
      {isAddModalVisible && (
        <Modal
          title={"Create a new Contact"}
          formId={addModalFormId}
          onClose={closeAddModal}
          actionLabel={"Submit"}
        >
          <ContactsForm formId={addModalFormId} />
        </Modal>
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
