import { PropsWithChildren, ReactElement } from "react";

interface ModalProps extends PropsWithChildren {
  formId?: string;
  onClose?: () => void;
  onClick?: () => void;
  title: string;
  actionLabel?: string;
  isLoading?: boolean;
}

type ModalComponent = (props: ModalProps) => ReactElement | null;

export type { ModalComponent, ModalProps };
