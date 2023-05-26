import React, { HTMLProps, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Category_Menu_Items, RTK_CusOrder } from "../../types";
import { OrderMenuBox } from "./OrderMenuBox";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../helper";

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
  const navigate = useNavigate();
  const query = useQuery();
  const company_id = query.get("company_id");

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

  const checkRoute = () => {
    return menu.menu_items.options
      .filter((i) => i.choices.length > 0)
      .some((i) => i.choices.some((i) => i.isAvailable));
  };

  return (
    <>
      <div
        className={`w-[170px] shadow-lg border border-black px-[10px] ${rest.className} ${
          menu.isAvailable ? "" : "opacity-50"
        } ${isExist && "border border-primary"}`}
        onClick={() =>
          menu.isAvailable
            ? checkRoute()
              ? navigate(
                  `/order/menu_item?id=${menu.menu_itemsId}&company_id=${company_id}`
                )
              : setAnchor(true)
            : ""
        }
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
          <div className="flex flex-col items-center">
            <p
              className={`text-primary font-medium ${
                menu.menu_items.discount && "line-through"
              }`}
            >
              {menu.menu_items.price}
              <span className="text-[13px]">{currency || ""}</span>
            </p>
            {menu.menu_items.discount > 0 ? (
              <p className={`text-primary font-medium `}>
                {menu.menu_items.price -
                  (menu.menu_items.price / 100) * menu.menu_items.discount}
                <span className="text-[13px]">{currency || ""}</span>
              </p>
            ) : (
              <></>
            )}
          </div>
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
