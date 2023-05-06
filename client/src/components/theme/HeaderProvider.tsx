import React, { HTMLProps } from "react";
import { InputField } from "../form";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const HeaderProvider = ({ children }: HTMLProps<HTMLDivElement>) => {
  const company = useSelector((state: RootState) => state.user.company);
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <div className="w-[calc(100%-70px)] ml-[70px] relative px-[50px] z-[19]">
      <div className="w-[calc(100%-70px)] px-[50px] fixed top-0 left-[70px] h-[70px] flex justify-between items-center bg-softdark">
        <div>
          <h1 className="text-[25px] font-medium">{company?.name}</h1>
          <p className="text-[14px] text-gray-200">
            {dateState.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="w-[200px]">
          <InputField id="search" placeholder="Search for food, coffe, etc.." />
        </div>
      </div>
      <div className="w-full pt-[100px] z-[-1]">{children}</div>
    </div>
  );
};
