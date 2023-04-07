import React, { HTMLProps, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Category_Menu_Items, RTK_CusOrder } from "../../types";
import { OrderMenuBox } from "./OrderMenuBox";

interface PropType extends HTMLProps<HTMLDivElement> {
  menu: Category_Menu_Items;
}

export const OrderMenuCard = ({ menu, ...rest }: PropType) => {
  const [anchor, setAnchor] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [existedMenu, setExistedMenu] = useState<RTK_CusOrder>(
    {} as RTK_CusOrder
  );
  const currency = useSelector(
    (state: RootState) => state.customerOrder.company?.currency
  );
  const cart = useSelector((state: RootState) => state.customerOrder.cart);

  useEffect(() => {
    if (cart.find((i) => i.menu.menu_itemsId === menu.menu_itemsId)) {
      setExistedMenu(
        cart.filter((i) => i.menu.menu_itemsId === menu.menu_itemsId)[0]
      );
      setIsExist(true);
    } else {
      setIsExist(false);
    }
  }, [cart]);

  return (
    <>
      <div
        className={`w-[150px] ${rest.className} ${
          menu.isAvailable ? "" : "opacity-50"
        } ${isExist && "border border-primary"}`}
        onClick={() => (menu.isAvailable ? setAnchor(true) : "")}
      >
        <img
          src={menu.menu_items.image_url || ""}
          className="w-full h-[125px] object-cover rounded-[10px]"
          alt=""
        />
        <div className="flex justify-between pt-[10px]">
          <p>
            {menu.menu_items.name.length > 10
              ? menu.menu_items.name.slice(0, 10) + ".."
              : menu.menu_items.name}
          </p>
          <p className="text-primary font-medium">
            {menu.menu_items.price}{" "}
            <span className="text-[13px]">{currency || ""}</span>
          </p>
        </div>
      </div>
      <OrderMenuBox
        isExist={isExist}
        isOpen={anchor}
        menu={menu}
        onClose={() => setAnchor(false)}
        onOpen={() => setAnchor(true)}
        defaultQuantity={isExist ? existedMenu.quantity : 1}
      />
    </>
  );
};
