import React from "react";
import { SmallLoader } from "../loader";

interface propTpye extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}

export const BtnPrimary = ({ isLoading, ...rest }: propTpye) => {
  const width = rest.width;
  return (
    <>
      <button
        //@ts-ignore
        type={rest.type || "submit"}
        disabled={rest.disabled}
        className={`bg-primary h-[35px] ${
          width ? "w-" + width : "px-[20px]"
        } rounded-[4px] text-[15px] font-medium flex justify-center items-center ${
          rest.className
        }`}
        onClick={rest.onClick}
      >
        {isLoading ? <SmallLoader /> : rest.children}
      </button>
    </>
  );
};
