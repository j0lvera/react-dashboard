import { EuiPageTemplate, EuiButton } from "@elastic/eui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { useModalUtils, Modal } from "../Common/Modal";
import { contactsQueryOptions, useCreateContact } from "./Contacts.api.ts";
import { ContactCreate } from "./Contacts.type.ts";

const ContactsList = () => {
  const contactsQuery = useSuspenseQuery(contactsQueryOptions);
  const contacts = contactsQuery.data;

  const createContact = useCreateContact();

  const {
    isVisible: isAddModalVisible,
    showModal: showAddModal,
    closeModal: closeAddModal,
    modalFormId: addModalFormId,
  } = useModalUtils("addModal");

  const handleSubmit = (contact: ContactCreate) => {
    createContact.mutate(contact, {
      onSuccess(res) {
        console.info("contact created!", res);
        closeAddModal();
      },
      onError(error) {
        console.error(error);
      },
      onSettled() {
        console.info("mutation finished");
      },
    });
  };

  return (
    <>
      {isAddModalVisible && (
        <Modal
          title={"Create a new Contact"}
          formId={addModalFormId}
          onClose={closeAddModal}
          actionLabel={"Submit"}
        >
          <ContactsForm formId={addModalFormId} onSubmit={handleSubmit} />
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
        <Table data={contacts} />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
