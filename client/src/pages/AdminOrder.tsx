import React from "react";
import { LayoutProvider } from "../components/theme";
import { IoOptionsSharp } from "react-icons/io5";

export const AdminOrder = () => {
  return (
    <LayoutProvider>
      <div className="w-full">
        <div className="w-full bg-dark py-[20px] px-[20px] rounded-[10px]">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[25px] font-bold">Your Orders</h1>
            <button className="flex items-center py-[7px] px-[10px] rounded-[5px] border border-softestdark space-x-[10px]">
              <IoOptionsSharp className="text-[20px]" />
              <span className="text-[14px]">Filter Orders</span>
            </button>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};
