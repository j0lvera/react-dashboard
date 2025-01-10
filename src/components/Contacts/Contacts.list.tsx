import { useState } from "react";
import { EuiPageTemplate, EuiButton, EuiConfirmModal } from "@elastic/eui";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ContactsTable as Table } from "./Contacts.table.tsx";
import { ContactsForm } from "./Contacts.form.tsx";
import { useModalUtils, Modal } from "../Common/Modal";
import {
  contactsQueryOptions,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "./Contacts.api.ts";
import { Contact, ContactCreate } from "./Contacts.type.ts";
import { CONTACTS_QUERY_KEY } from "./Contacts.constants.ts";
import { getRouteApi } from "@tanstack/react-router";

const contactsListRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const loaderDeps = contactsListRouteApi.useLoaderDeps();
  const queryClient = useQueryClient();

  // we use this hook to manage the modal state for both edit and delete modals.
  const [selectedContact, setSelectedContact] = useState<ContactCreate | null>(
    null,
  );

  // Query data

  const contactsQuery = useSuspenseQuery(
    contactsQueryOptions(loaderDeps.page, loaderDeps.size),
  );
  const { data: contacts, pagination } = contactsQuery.data;
  console.info("pagination", pagination);

  // CREATE functionality

  // create mutation hook
  const createContact = useCreateContact();

  // create modal state
  const {
    isVisible: isAddModalVisible,
    showModal: showAddModal,
    closeModal: closeAddModal,
    modalFormId: addModalFormId,
  } = useModalUtils("addModal");

  // callback for the create api call
  const handleCreateContact = (contact: ContactCreate) => {
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

  // EDIT functionality

  // edit mutation hook
  const updateContact = useUpdateContact();

  // edit modal state
  const {
    isVisible: isEditModalVisible,
    showModal: showEditModal,
    closeModal: closeEditModal,
    modalFormId: editModalFormId,
  } = useModalUtils("editModal");

  // callback for the edit api call
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

  // callback for the edit button in the table
  const handleTableItemEdit = (contact: Contact) => {
    console.info("Edit", contact);
    setSelectedContact(contact);
    showEditModal();
  };

  // DELETE functionality

  // delete mutation hook
  const deleteContact = useDeleteContact();

  // delete modal state
  const {
    isVisible: isDeleteModalVisible,
    showModal: showDeleteModal,
    closeModal: closeDeleteModal,
    modalTitleId: deleteModalTitleId,
  } = useModalUtils("deleteModal");

  const handleDelete = () => {
    const contact = selectedContact;
    if (!contact) return;

    deleteContact.mutate(contact, {
      onError(error, variables, context) {
        // an error happened
        console.info("error", error, variables, context);
      },
      async onSuccess(data, variables, context) {
        console.info("contact created!", data, variables, context);
        closeDeleteModal();
        await queryClient.invalidateQueries({
          queryKey: [CONTACTS_QUERY_KEY],
        });
      },
    });
  };

  const handleTableItemDelete = (contact: Contact) => {
    console.info("Delete", contact);
    setSelectedContact(contact);
    showDeleteModal();
  };

  return (
    <>
      {isDeleteModalVisible && (
        <EuiConfirmModal
          aria-labelledby={deleteModalTitleId}
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
          title="Delete contact?"
          titleProps={{
            id: deleteModalTitleId,
          }}
          buttonColor="danger"
          cancelButtonText={"Cancel"}
          confirmButtonText="Delete"
          defaultFocusedButton="confirm"
          isLoading={deleteContact.isPending}
        >
          <p>Are you sure you want to delete this contact?</p>
        </EuiConfirmModal>
      )}
      {isEditModalVisible && selectedContact && (
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
            defaultValues={selectedContact}
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
          <ContactsForm
            formId={addModalFormId}
            onSubmit={handleCreateContact}
          />
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
        <Table
          data={contacts}
          pagination={pagination}
          onEdit={handleTableItemEdit}
          onDelete={handleTableItemDelete}
        />
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
