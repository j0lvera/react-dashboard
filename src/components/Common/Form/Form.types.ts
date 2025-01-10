import { PropsWithChildren, ReactElement } from "react";
import {
  DefaultValues,
  Control,
  ControllerProps,
  // ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

// Form
interface FormProps<T extends FieldValues> {
  formId?: string;
  defaultValues?: DefaultValues<T>;
  onSubmit?: (data: T) => void;
  isLoading?: boolean;
  children: (props: { control: Control<T> }) => ReactElement;
}

// Field
interface FormFieldProps<T extends FieldValues = FieldValues>
  extends PropsWithChildren {
  name?: string;
  label: string;
  placeholder?: string;
  control: Control<T>;
  rules?: ControllerProps["rules"];
  helpText?: string;
}

export type { FormProps, FormFieldProps };
