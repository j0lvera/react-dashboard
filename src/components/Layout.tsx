import { ReactElement, PropsWithChildren } from "react";
import { Outlet } from "@tanstack/react-router";

type LayoutComponent = (props: PropsWithChildren) => ReactElement | null;

const Layout: LayoutComponent = () => {
  return (
    <div>
      <p>Layout</p>

      <Outlet />
    </div>
  );
};

export { Layout };
