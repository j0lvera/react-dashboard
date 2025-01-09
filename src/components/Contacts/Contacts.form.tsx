import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  EuiButton,
  EuiForm,
  EuiFieldText,
  EuiFieldNumber,
  EuiFormRow,
  EuiSelect,
} from "@elastic/eui";
import {
  roles,
  ContactsFormComponent,
  ContactCreate,
} from "./Contacts.type.ts";

const ContactsForm: ContactsFormComponent = ({
  formId,
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const { control, handleSubmit } = useForm<ContactCreate>({
    defaultValues,
  });

  const roleOptions = Object.entries(roles).map(([key, value]) => ({
    text: key,
    value: value,
  }));

  console.info("role options", roleOptions);

  const submitHandler: SubmitHandler<ContactCreate> = (data) => {
    onSubmit?.(data);
  };

  return (
    <>
      <EuiForm
        component="form"
        id={formId}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Please enter the name" }}
          render={({ field, fieldState }) => (
            <EuiFormRow
              label="Name"
              helpText={!fieldState.invalid && "Friendly help text."}
              isInvalid={fieldState.invalid}
              error={fieldState.error?.message}
            >
              <EuiFieldText
                placeholder={"e.g., John Doe"}
                {...field}
                isInvalid={fieldState.invalid}
              />
            </EuiFormRow>
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{
            required: "Please enter the address",
          }}
          render={({ field, fieldState }) => (
            <EuiFormRow
              label="Address"
              helpText={!fieldState.invalid && "Friendly help text."}
              isInvalid={fieldState.invalid}
              error={fieldState.error?.message}
            >
              <EuiFieldText
                placeholder={"e.g., Main St 123"}
                {...field}
                isInvalid={fieldState.invalid}
              />
            </EuiFormRow>
          )}
        />

        <Controller
          name="age"
          control={control}
          rules={{
            required: "Please enter the age",
            min: {
              value: 0,
              message: "Age must be a positive number",
            },
          }}
          render={({ field, fieldState }) => (
            <EuiFormRow
              label="Age"
              helpText={!fieldState.invalid && "Friendly help text."}
              isInvalid={fieldState.invalid}
              error={fieldState.error?.message}
            >
              <EuiFieldNumber
                placeholder={"e.g., 32"}
                {...field}
                isInvalid={fieldState.invalid}
              />
            </EuiFormRow>
          )}
        />

        <Controller
          name="role"
          control={control}
          rules={{
            required: "Please select a role",
          }}
          render={({ field, fieldState }) => (
            <EuiFormRow
              label="Role"
              helpText={!fieldState.invalid && "Friendly help text."}
              isInvalid={fieldState.invalid}
              error={fieldState.error?.message}
            >
              <EuiSelect
                hasNoInitialSelection
                options={roleOptions}
                {...field}
                isInvalid={fieldState.invalid}
              />
            </EuiFormRow>
          )}
        />

        {!formId && (
          <EuiButton type="submit" fill isLoading={isLoading}>
            Save form
          </EuiButton>
        )}
      </EuiForm>
    </>
  );
};

export { ContactsForm };
