import React from "react";

export const BtnDark = ({ ...rest }: React.HTMLProps<HTMLButtonElement>) => {
  const width = rest.width;

  return (
    <button
      className={`bg-dark h-[35px] ${
        width ? "w-" + width : "px-[20px]"
      } rounded-[4px] text-[15px] font-medium`}
      onClick={rest.onClick}
    >
      {rest.children}
    </button>
  );
};
