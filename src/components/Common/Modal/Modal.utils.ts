import { useState } from "react";
import { useGeneratedHtmlId } from "@elastic/eui";

const useModalUtils = (prefix: string) => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return {
    isVisible,
    setIsVisible,
    showModal,
    closeModal,
    modalTitleId: useGeneratedHtmlId({ prefix: prefix + "_modalTitle" }),
    modalFormId: useGeneratedHtmlId({ prefix: prefix + "_modalForm" }),
  };
};

export { useModalUtils };
