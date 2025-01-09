import { EuiPageTemplate } from "@elastic/eui";
import { getRouteApi } from "@tanstack/react-router";

const contactsRouteApi = getRouteApi("/_layout/contacts");

const ContactsList = () => {
  const data = contactsRouteApi.useLoaderData();
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle={"Contacts"}
        description={"List of contacts"}
      />
      <EuiPageTemplate.Section>
        <ul>
          {data.map(({ name, age, role }) => {
            return (
              <li key={name}>
                <p>
                  {name}, {age} | {role}
                </p>
              </li>
            );
          })}
        </ul>
      </EuiPageTemplate.Section>
    </>
  );
};

export { ContactsList };
