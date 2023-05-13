import React from "react";

export const OrderPageHeader = () => {
  return (
    <div className="h-[70px] w-full sticky top-0 left-0 flex justify-between items-center px-[2.2rem] bg-dark">
      <h1 className="text-[25px] font-bold ">Zen Pos</h1>
      <ul className="flex space-x-[20px]">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer text-red-500">Logout</li>
      </ul>
    </div>
  );
};
