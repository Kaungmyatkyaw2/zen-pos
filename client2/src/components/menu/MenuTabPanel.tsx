import React, { useState } from "react";
import { TabPanel, TabPanelProps } from "@mui/lab";
import { AiOutlinePlus } from "react-icons/ai";
import { MenuCreateForm } from "./MenuCreateForm";
import { Category } from "../../types";
import { MenuCard } from "./MenuCard";

interface Proptype extends TabPanelProps {
  category: Category;
}

export const MenuTabPanel = ({ category, value }: Proptype) => {
  const [openCreateForm, setOpenCreateForm] = useState(false);

  return (
    <>
      <TabPanel value={value}>
        <div className="flex ml-[-20px] flex-wrap mt-[-20px]">
          <button
            onClick={() => setOpenCreateForm(true)}
            className="w-[220px] h-[270px] bg-dark rounded-[10px] space-y-[10px] flex flex-col justify-center items-center text-white cursor-pointer ml-[20px] mt-[20px]"
          >
            <AiOutlinePlus className="text-[24px] text-primary" />
            <h1 className="text-[20px]">Create Menu</h1>
          </button>
          {category?.category_menu_items?.map((i) => (
            <MenuCard key={i?.id} className="ml-[20px] mt-[20px]" info={i} />
          ))}
        </div>
      </TabPanel>

      {openCreateForm && (
        <MenuCreateForm
          id={category.id}
          onClose={() => setOpenCreateForm(false)}
        />
      )}
    </>
  );
};
