import { BsX } from "react-icons/bs";
import { SwipeableDrawer } from "@mui/material";
import { BtnPrimary } from "../form";
import { OptionCheckBox, OptionRadioBox } from "../option";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Category_Menu_Items, Choice } from "../../types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToCart, editCart } from "../../store/slice/CustomerOrder";

interface PropType {
  onClose: () => void;
  onOpen: () => void;
  isExist: boolean;
  isOpen: boolean;
  defaultQuantity: number;
  menu: Category_Menu_Items;
}

export const OrderMenuBox = ({
  onClose,
  onOpen,
  isOpen,
  isExist,
  defaultQuantity,
  menu,
}: PropType) => {
  const form = useRef<HTMLFormElement>(null!);
  const currency = useSelector(
    (state: RootState) => state.customerOrder.company?.currency
  );
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [choices, setChoices] = useState<Choice[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && !isExist) {
      setQuantity(1);
    }
  }, [isOpen]);

  const menuAddToCart = () => {
    if (!isExist) {
      dispatch(addToCart({ menu, quantity, description: "", choices }));
      onClose();
    } else {
      dispatch(
        editCart({
          id: menu.menu_itemsId,
          payload: { menu, quantity, description: "", choices },
        })
      );
      onClose();
    }
  };

  const addRequireChoice = (data: Choice) => {
    const orgChoice = choices.filter((i) => i.options_id !== data.options_id);
    setChoices([...orgChoice, data]);
  };

  const addOptionalChoice = (data: Choice) => {
    setChoices([...choices, data]);
  };

  const removeOptionalChoice = (data: Choice) => {
    setChoices(choices.filter((i) => i.id !== data.id));
  };

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        open={isOpen}
        onClose={() => onClose()}
        onOpen={() => onOpen()}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
          },
        }}
      >
        <div className=" py-[40px] bg-softdark px-[10px] relative rounded-t-[20px]">
          <button
            onClick={() => onClose()}
            className="text-white absolute top-[20px] right-[20px] text-[30px]"
          >
            <BsX />
          </button>
          <h1 className="pb-[10px] text-[20px] text-white">
            {isExist ? "Update cart" : "Add to cart"}
          </h1>
          <div className="w-full flex items-center space-x-[20px]">
            <img
              src={menu.menu_items.image_url || ""}
              className=" h-[125px] w-[150px] object-cover rounded-[10px]"
              alt=""
            />
            <div className="space-y-[20px]">
              <div className="text-white">
                <h1 className="text-[20px] font-bold">
                  {menu.menu_items.name}
                </h1>
                <p className="text-primary font-medium">
                  {menu.menu_items.price}{" "}
                  <span className="text-[13px]">{currency || ""}</span>
                </p>
              </div>
              <div className="flex items-center text-white">
                <BtnPrimary
                  className="!px-[10px]"
                  onClick={() => setQuantity((prev) => --prev)}
                >
                  <AiOutlineMinus className="text-white" />
                </BtnPrimary>
                <span className="px-[10px]">{quantity}</span>
                <BtnPrimary
                  className="!px-[10px]"
                  onClick={() => setQuantity((prev) => ++prev)}
                >
                  <AiOutlinePlus />
                </BtnPrimary>
              </div>
            </div>
          </div>
          {/* 
          {menu.menu_items.options.length ? (
            <div className="pt-[20px]">
              <h1 className="text-gray-300 font-bold text-[25px] pb-[15px]">
                Options
              </h1>
              <form ref={form} className="flex flex-col space-y-[20px]">
                {menu.menu_items?.options?.map((o) =>
                  o.choices.length ? (
                    o.isRequired ? (
                      <OptionRadioBox
                        addChoice={addRequireChoice}
                        option={o}
                        key={o.id}
                      />
                    ) : (
                      <OptionCheckBox
                        addChoice={addOptionalChoice}
                        removeChoice={removeOptionalChoice}
                        option={o}
                        key={o.id}
                      />
                    )
                  ) : (
                    <React.Fragment key={o.id}></React.Fragment>
                  )
                )}
              </form>
            </div>
          ) : (
            <></>
          )} */}

          <BtnPrimary
            className="text-white w-full mt-[20px]"
            onClick={() => menuAddToCart()}
          >
            {isExist ? "Update cart" : "Add to cart"}
          </BtnPrimary>
        </div>
      </SwipeableDrawer>
    </>
  );
};
