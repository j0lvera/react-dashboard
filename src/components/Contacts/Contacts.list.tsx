import { useState } from "react";
import { EuiPageTemplate, EuiButton } from "@elastic/eui";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { useModalUtils, Modal } from "../Common/Modal";
import {
  contactsQueryOptions,
  useCreateContact,
  useUpdateContact,
} from "./Contacts.api.ts";
import { Contact, ContactCreate } from "./Contacts.type.ts";
import { CONTACTS_QUERY_KEY } from "./Contacts.constants.ts";

const ContactsList = () => {
  const [contactToEdit, setContactToEdit] = useState<ContactCreate | null>(
    null,
  );

  const queryClient = useQueryClient();
  const contactsQuery = useSuspenseQuery(contactsQueryOptions);
  const contacts = contactsQuery.data;

  const createContact = useCreateContact();
  const updateContact = useUpdateContact();

  const {
    isVisible: isAddModalVisible,
    showModal: showAddModal,
    closeModal: closeAddModal,
    modalFormId: addModalFormId,
  } = useModalUtils("addModal");

  const {
    isVisible: isEditModalVisible,
    showModal: showEditModal,
    closeModal: closeEditModal,
    modalFormId: editModalFormId,
  } = useModalUtils("editModal");

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

  const handleEdit = (contact: Contact) => {
    updateContact.mutate(contact, {
      onError(error, variables, context) {
        // an error happened
        console.info("error", error, variables, context);
      },
      async onSuccess(data, variables, context) {
        console.info("contact created!", data, variables, context);
        closeEditModal();
        await queryClient.invalidateQueries({
          queryKey: [CONTACTS_QUERY_KEY],
        });
      },

      onSettled(data, error, variables, context) {
        console.info("mutation finished", data, error, variables, context);
      },
    });
  };

  const handleTableItemEdit = (contact: Contact) => {
    console.info("Edit", contact);
    setContactToEdit(contact);
    showEditModal();
  };

  return (
    <>
      {isEditModalVisible && contactToEdit && (
        <Modal
          title={"Edit Contact"}
          formId={editModalFormId}
          onClose={closeEditModal}
          actionLabel={"Submit"}
          isLoading={updateContact.isPending}
        >
          <ContactsForm
            formId={editModalFormId}
            onSubmit={handleEdit}
            defaultValues={contactToEdit}
            isLoading={updateContact.isPending}
          />
        </Modal>
      )}
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
        <Table data={contacts} onEdit={handleTableItemEdit} />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
