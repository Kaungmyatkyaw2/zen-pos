import React from "react";
import { Sidebar } from "../sidebar";
import { HeaderProvider } from "./HeaderProvider";

export const LayoutProvider = ({
  children,
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <>
      <Sidebar />
      <HeaderProvider>{children}</HeaderProvider>
    </>
  );
};
