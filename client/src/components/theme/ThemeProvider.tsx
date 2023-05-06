import React from "react";

interface PropType {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: PropType) => {
  return (
    <div className="w-full h-screen bg-softdark text-white">{children}</div>
  );
};
