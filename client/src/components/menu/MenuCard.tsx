import React, { useState } from "react";
import { Category_Menu_Items } from "../../types";
import menuImage from "../../assets/menu.jpeg";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MenuDeletePopup } from "./MenuDeletePopup";
import ImageLazy from "../image/ImageLazy";
import { MenuEditForm } from "./MenuEditForm";

interface PropType extends React.HTMLProps<HTMLDivElement> {
  info: Category_Menu_Items;
}

export const MenuCard = ({ info, ...rest }: PropType) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <div
        className={`w-[220px] h-[270px] bg-dark rounded-[10px] space-y-[10px] text-white cursor-pointer py-[15px] px-[15px] shadow-sm z-[1] ${
          rest.className
        } relative overflow-hidden group  ${
          !info.isAvailable && "border border-primary"
        }`}
      >
        <div className="absolute top-0 left-0 bg-softestdark flex flex-col rounded-tl-[10px] translate-y-[-100%] group-hover:translate-y-0 transition-all duration-200 z-[9]">
          <button
            onClick={() => setShowDeletePopup(true)}
            className="py-[10px] px-[10px] border-b border-dark text-red-500"
          >
            <AiOutlineDelete />
          </button>
          <button
            onClick={() => setShowEditForm(true)}
            className="py-[10px] px-[10px] text-blue-500"
          >
            <AiOutlineEdit />
          </button>
        </div>

        <div className="pb-[10px] relative z-[1]">
          <div className="text-white absolute top-[5px] right-[5px] bg-opacity-90 bg-softestdark px-[5px] py-[3px] rounded-[10px]">
            {info.menu_items.options?.length} Options
          </div>

          <ImageLazy
            src={info.menu_items.image_url || menuImage}
            alt=""
            className="w-full h-[120px] object-cover rounded-[10px] shadow-dark"
          />
        </div>
        {info.menu_items.description && (
          <div className="pb-[0px]">
            <p className="text-gray-400 text-sm">
              {info.menu_items.description}
            </p>
          </div>
        )}
        <div className="h-full flex justify-between">
          <h1>{info.menu_items.name}</h1>
          <p className="font-bold text-primary">${info.menu_items.price}</p>
        </div>
      </div>

      {showDeletePopup && (
        <MenuDeletePopup
          onClose={() => setShowDeletePopup(false)}
          data={info}
        />
      )}

      {showEditForm && (
        <MenuEditForm onClose={() => setShowEditForm(false)} menu={info} />
      )}
    </>
  );
};
