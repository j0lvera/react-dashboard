import { cloneElement, forwardRef, isValidElement, ReactElement } from "react";
import { EuiFormRow } from "@elastic/eui";
import {
  Controller,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import { FormFieldProps } from "./Form.types.ts";

const FormField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  rules,
  helpText,
  children,
}: FormFieldProps<T>) => {
  if (!isValidElement(children)) {
    throw new Error("FormField must have children");
  }

  if (!name) {
    name = label.toLowerCase();
  }

  // create a forwarded version of the child component.
  // this will prevent a warning:
  // > Warning: Function components cannot be given refs.
  // > Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
  // > Check the render method of `ForwardRef`.
  const ForwardedInput = forwardRef<HTMLElement, HTMLInputElement>(
    (props, ref) => {
      return cloneElement(children as ReactElement, {
        ...props,
        // eui components use inputRef instead of ref
        inputRef: ref,
      });
    },
  );

  return (
    <Controller<T>
      name={name as Path<T>}
      control={control}
      rules={rules as RegisterOptions<T, Path<T>>}
      render={({ field, fieldState }) => (
        <EuiFormRow
          label={label}
          helpText={!fieldState.invalid && helpText}
          isInvalid={fieldState.invalid}
          error={fieldState.error?.message}
        >
          <ForwardedInput
            {...children.props}
            {...field}
            isInvalid={fieldState.invalid}
            placeholder={placeholder}
          />
        </EuiFormRow>
      )}
    />
  );
};

export { FormField };
