import React from "react";
import { IconType } from "react-icons/lib";

interface PropType extends React.HTMLProps<HTMLButtonElement> {
  icon: React.ReactNode;
  isActive: boolean;
}

export const SideBtn = ({ icon, isActive, ...rest }: PropType) => {
  return (
    <div className={`w-full py-[20px] ${isActive && "bg-dark"}` }>
      <button
        className={`${
          isActive
            ? "px-[10px] py-[10px] text-white rounded-[5px] bg-primary w-fit mx-auto cursor-pointer block shadow-custom"
            : "mx-auto flex justify-center"
        }`}
        onClick={rest.onClick}
      >
        <div className="text-[20px] mx-auto cursor-pointer">{icon}</div>
      </button>
    </div>
  );
};
