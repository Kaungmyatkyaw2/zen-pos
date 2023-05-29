import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineDropbox,
  AiOutlineEdit,
} from "react-icons/ai";
import { Category } from "../../types";
import { CategoryDeletePopup } from "./CategoryDeletePopup";
import { CategoryEditForm } from "./CategoryEditForm";

interface PropType extends React.HTMLProps<HTMLDivElement> {
  category: Category;
}

export const CategoryCard = ({ category, ...rest }: PropType) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  return (
    <>
      <div
        {...rest}
        className="w-[190px] h-[150px] rounded-[7px] bg-dark p-[10px] pt-[15px] pb-[20px] flex flex-col justify-between first-of-type:ml-0 sm:ml-[30px] mt-[30px] relative"
      >
        <div className="absolute top-0 right-0 p-[15px] space-x-[10px]">
          {category.id !== null ? (
            <>
              <button
                className="text-primary w-fit text-[20px]"
                onClick={() => setOpenDeletePopup(true)}
              >
                <AiOutlineDelete />
              </button>
              <button
                className="text-blue-600 w-fit text-[20px]"
                onClick={() => setOpenEditForm(true)}
              >
                <AiOutlineEdit />
              </button>
            </>
          ) : (
            <h1>None Category</h1>
          )}
        </div>

        <div className="text-[30px]">
          <AiOutlineDropbox />
        </div>
        <div>
          <p className="text-[14px] text-gray-300">
            {category.category_menu_items.length} items
          </p>
          <h1 className="font-bold text-[18px]">{category.name}</h1>
        </div>
      </div>
      {openDeletePopup && (
        <CategoryDeletePopup
          data={category}
          onClose={() => setOpenDeletePopup(false)}
        />
      )}
      {openEditForm && (
        <CategoryEditForm
          data={category}
          onClose={() => setOpenEditForm(false)}
        />
      )}
    </>
  );
};
