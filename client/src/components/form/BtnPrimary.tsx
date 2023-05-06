import React from "react";
import { SmallLoader } from "../loader";
import { CircularProgress } from "@mui/material";

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
        className={`bg-primary disabled:cursor-not-allowed h-[35px] ${
          width ? "w-" + width : "px-[20px]"
        } rounded-[4px] text-[15px] font-medium flex justify-center items-center ${
          rest.className
        } disabled:opacity-60`}
        onClick={rest.onClick}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "white" }} size={20} />
        ) : (
          rest.children
        )}
      </button>
    </>
  );
};
