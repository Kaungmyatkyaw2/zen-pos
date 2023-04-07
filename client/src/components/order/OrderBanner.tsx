import React, { HTMLProps } from "react";
import banner from "./../../assets/order-banner.jpg";

export const OrderBanner = ({ ...rest }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className="h-[200px] relative w-full">
      <img
        src={banner}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className=" px-[10px] py-[20px] sm:w-[500px] w-[90%] bg-softestdark rounded-[10px] absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%]">
        <h1 className="font-bold text-white text-[25px]">{rest.children}</h1>
        <p className="text-gray-400 pt-[10px]">Some Description....</p>
      </div>
    </div>
  );
};
