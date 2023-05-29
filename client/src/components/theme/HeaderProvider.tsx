import React, { HTMLProps } from "react";
import { InputField } from "../form";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slice/interface.slice";
import { AiOutlineMenu } from "react-icons/ai";
import { BsX } from "react-icons/bs";

export const HeaderProvider = ({ children }: HTMLProps<HTMLDivElement>) => {
  const company = useSelector((state: RootState) => state.user.company);
  const dispatch = useDispatch();
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <div className="md:w-[calc(100%-70px)] w-full overflow-x-hidden md:ml-[70px] ml-0 relative md:px-[50px] px-[20px] z-[19]">
      <div className="md:w-[calc(100%-70px)] w-full md:px-[50px] px-[20px] fixed top-0 md:left-[70px] left-0 h-[70px] flex justify-between items-center bg-softdark z-[9]">
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
        <div className="w-[200px] md:block hidden">
          <InputField id="search" placeholder="Search for food, coffe, etc.." />
        </div>
        <button
          className="text-[20px] md:hidden block"
          onClick={() => dispatch(toggleSidebar("start"))}
        >
          <AiOutlineMenu />
        </button>
      </div>
      <div className="w-full pt-[100px] z-[-1]">{children}</div>
    </div>
  );
};
