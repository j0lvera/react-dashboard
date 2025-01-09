import {
  EuiButton,
  EuiForm,
  EuiFieldText,
  EuiFieldNumber,
  EuiFormRow,
  EuiSelect,
} from "@elastic/eui";
import { roles, ContactsFormComponent } from "./Contacts.type.ts";

const ContactsForm: ContactsFormComponent = ({ id }) => {
  const roleOptions = Object.keys(roles).map((role) => ({
    value: role,
    text: role,
  }));
  return (
    <EuiForm component="form" id={id}>
      <EuiFormRow label="Name" helpText={"Friendly help text."}>
        <EuiFieldText placeholder={"e.g., John Doe"} />
      </EuiFormRow>

      <EuiFormRow label="Address" helpText={"Friendly help text."}>
        <EuiFieldText placeholder={"e.g., Main St 123"} />
      </EuiFormRow>

      <EuiFormRow label="Age" helpText={"Friendly help text."}>
        <EuiFieldNumber placeholder={"e.g., 32"} />
      </EuiFormRow>

      <EuiFormRow label={"Role"} helpText={"Friendly help text."}>
        <EuiSelect
          hasNoInitialSelection
          onChange={() => {}}
          options={roleOptions}
        />
      </EuiFormRow>

      <EuiButton type="submit" fill>
        Save form
      </EuiButton>
    </EuiForm>
  );
};

export { ContactsForm };
