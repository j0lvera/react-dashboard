import { ReactElement, PropsWithChildren } from "react";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPageTemplate,
} from "@elastic/eui";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Common/Sidebar";

type LayoutComponent = (props: PropsWithChildren) => ReactElement | null;

const Layout: LayoutComponent = () => {
  return (
    <>
      <EuiHeader>
        <EuiHeaderSection>
          <EuiHeaderSectionItem>
            <p>Header</p>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      <EuiPageTemplate grow>
        <EuiPageTemplate.Sidebar>
          <Sidebar />
        </EuiPageTemplate.Sidebar>
        <Outlet />
      </EuiPageTemplate>
    </>
  );
};

export { Layout };
