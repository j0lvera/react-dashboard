import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
} from "@elastic/eui";
import { ContactsModalComponent } from "./Contacts.type.ts";

const ContactsModal: ContactsModalComponent = ({
  formId,
  onClick,
  onClose,
  children,
}) => {
  const titleId = useGeneratedHtmlId({ prefix: "modalPrefix" });
  const handleClose = () => {
    onClose?.();
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <EuiModal
      aria-labelledby={titleId}
      onClose={handleClose}
      initialFocus="[name=popswitch]"
    >
      <EuiModalHeader>
        <EuiModalHeaderTitle id={titleId}>
          Create a new Contact
        </EuiModalHeaderTitle>
        <EuiModalBody>{children}</EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={handleClose}>Cancel</EuiButtonEmpty>
          <EuiButton type="submit" form={formId} onClick={handleClick} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModalHeader>
    </EuiModal>
  );
};

export { ContactsModal };
