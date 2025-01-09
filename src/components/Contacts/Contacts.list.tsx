import { EuiPageTemplate, EuiButton } from "@elastic/eui";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { useModalUtils, Modal } from "../Common/Modal";
import { contactsQueryOptions, useCreateContact } from "./Contacts.api.ts";
import { ContactCreate } from "./Contacts.type.ts";
import { CONTACTS_QUERY_KEY } from "./Contacts.constants.ts";

const ContactsList = () => {
  const queryClient = useQueryClient();
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
      onError(error, variables, context) {
        // an error happened
        console.info("error", error, variables, context);
      },
      async onSuccess(data, variables, context) {
        console.info("contact created!", data, variables, context);
        closeAddModal();
        await queryClient.invalidateQueries({
          queryKey: [CONTACTS_QUERY_KEY],
        });
      },

      onSettled(data, error, variables, context) {
        console.info("mutation finished", data, error, variables, context);
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
