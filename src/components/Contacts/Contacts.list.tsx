import { getRouteApi } from "@tanstack/react-router";

const contactsRouteApi = getRouteApi("/contacts");

const ContactsList = () => {
  const data = contactsRouteApi.useLoaderData();
  return (
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
  );
};

export { ContactsList };
