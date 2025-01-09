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
import { ModalComponent } from "./Modal.types.ts";

const Modal: ModalComponent = ({
  formId,
  onClick,
  onClose,
  title,
  actionLabel = "Save",
  isLoading,
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
        <EuiModalHeaderTitle id={titleId}>{title}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>{children}</EuiModalBody>
      <EuiModalFooter>
        <EuiButtonEmpty onClick={handleClose}>Cancel</EuiButtonEmpty>
        <EuiButton
          type="submit"
          form={formId}
          onClick={handleClick}
          fill
          isLoading={isLoading}
        >
          {actionLabel}
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};

export { Modal };
