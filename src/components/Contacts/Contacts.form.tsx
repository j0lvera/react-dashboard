import { EuiFieldText, EuiFieldNumber, EuiSelect } from "@elastic/eui";
import {
  roles,
  ContactsFormComponent,
  ContactCreate,
} from "./Contacts.type.ts";
import { Form, FormField } from "../Common/Form";

const ContactsForm: ContactsFormComponent = ({
  formId,
  defaultValues,
  onSubmit,
  isLoading,
}) => {
  const roleOptions = Object.entries(roles).map(([key, value]) => ({
    text: key,
    value: value,
  }));

  console.info("role options", roleOptions);

  const handleSubmit = (data: ContactCreate) => {
    onSubmit?.(data);
  };

  return (
    <>
      <Form<ContactCreate>
        formId={formId}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        {({ control }) => (
          <>
            <FormField
              label={"Name"}
              control={control}
              rules={{ required: "Please enter the name" }}
              placeholder={"e.g., John Doe"}
            >
              <EuiFieldText />
            </FormField>

            <FormField
              label={"Address"}
              control={control}
              rules={{ required: "Please enter the address" }}
              placeholder={"e.g., Main St 123"}
            >
              <EuiFieldText />
            </FormField>

            <FormField
              label="Age"
              control={control}
              rules={{
                required: "Please enter the age",
                min: {
                  value: 0,
                  message: "Age must be a positive number",
                },
              }}
              placeholder="e.g., 32"
              helpText="Friendly help text."
            >
              <EuiFieldNumber />
            </FormField>

            <FormField
              label="Role"
              name="role"
              control={control}
              rules={{
                required: "Please select a role",
              }}
              helpText="Friendly help text."
            >
              <EuiSelect hasNoInitialSelection options={roleOptions} />
            </FormField>
          </>
        )}
      </Form>
    </>
  );
};

export { ContactsForm };
