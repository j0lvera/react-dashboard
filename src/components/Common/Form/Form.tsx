import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { EuiButton, EuiForm } from "@elastic/eui";
import { FormProps } from "./Form.types.ts";

const Form = <T extends FieldValues>({
  formId,
  defaultValues,
  onSubmit,
  isLoading,
  children,
}: FormProps<T>) => {
  console.group("Form");
  console.info(defaultValues);
  console.groupEnd();

  const { control, handleSubmit } = useForm<T>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<T> = (data) => {
    onSubmit?.(data);
  };

  return (
    <>
      <EuiForm
        component="form"
        id={formId}
        onSubmit={handleSubmit(submitHandler)}
      >
        {children({ control })}

        {!formId && (
          <EuiButton type="submit" fill isLoading={isLoading}>
            Save form
          </EuiButton>
        )}
      </EuiForm>
    </>
  );
};

export { Form };
