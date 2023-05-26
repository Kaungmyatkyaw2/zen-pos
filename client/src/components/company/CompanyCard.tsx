import React from "react";
import placeholder from "../../assets/menu.jpeg";
import { Company } from "../../types";

interface Prop extends React.HTMLProps<HTMLDivElement> {
  company: Company;
}

export const CompanyCard = ({ company, className, ...rest }: Prop) => {
  return (
    <div
      className={`w-full bg-dark h-[100px] flex overflow-hidden rounded-[10px] relative cursor-pointer ${className}`}
      {...rest}
    >
      <img
        className="min-w-[130px] h-full object-cover"
        src={placeholder}
        alt=""
      />
      <div className="w-full flex flex-col justify-center px-[20px] space-y-[5px]">
        <h1 className="font-medium">{company.name}</h1>
        <h1 className="text-[12px] text-gray-400"></h1>
        <p className="text-[14px] text-gray-400"> Some Description</p>
      </div>
    </div>
  );
};
