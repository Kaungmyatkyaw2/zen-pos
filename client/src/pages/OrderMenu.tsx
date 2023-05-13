import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { OptionCheckBox, OptionRadioBox } from "../components/option";
import { Category_Menu_Items, Choice } from "../types";
import { addToCart, editCart } from "../store/slice/CustomerOrder";
import { BtnPrimary } from "../components/form";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "../helper";
import { ScreenLoader } from "../components/loader";
import { useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";

export const OrderMenu = () => {
  const [isExist, setIsExist] = useState(false);
  const [options, setOptions] = useState<
    { option_id: number; min: number; max: number }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [choices, setChoices] = useState<Choice[]>([]);
  const query = useQuery();
  const menu_id = query.get("id");
  const company_id = query.get("company_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.customerOrder.categories
  );
  const cart = useSelector((state: RootState) => state.customerOrder.cart);
  const [menu, setMenu] = useState<Category_Menu_Items>(
    {} as Category_Menu_Items
  );

  useEffect(() => {
    if (menu.menu_items) {
      const payload = menu.menu_items?.options
        ?.filter((o) => !(o.min === 0 && o.max === 0))
        ?.map((i) => ({
          option_id: i.id,
          min: i.min,
          max: i.max,
        }));

      setOptions(payload);

      if (!payload?.length || payload?.every((i) => i.min == 0)) {
        setIsDisable(false);
      }
    }
  }, [menu]);

  useEffect(() => {
    if (options !== null) {
      const isAllTrue = options.map((op) => {
        const filtered = choices.filter((i) => i.options_id == op.option_id);
        return filtered.length >= op.min && filtered.length <= op.max;
      });

      if (isAllTrue.every((i) => !!i)) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  }, [choices, options]);

  useEffect(() => {
    if (menu_id) {
      checkIsExist(menu_id);
    }
  }, [menu_id]);

  const menuAddToCart = () => {
    if (!isExist) {
      dispatch(addToCart({ menu, quantity, description: "", choices }));
      navigate(`/order?company_id=${company_id}`);
    } else {
      dispatch(
        editCart({
          id: menu.menu_itemsId,
          payload: { menu, quantity, description: "", choices },
        })
      );
      navigate(`/order?company_id=${company_id}`);
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

  const checkIsExist = (menu_id: string) => {
    const isMenuItemExist = cart.filter(
      (i) => i.menu.menu_itemsId === +menu_id
    );

    if (isMenuItemExist.length === 1) {
      setMenu(isMenuItemExist[0].menu);
      setQuantity(isMenuItemExist[0].quantity);
      setChoices(isMenuItemExist[0].choices);
      setIsExist(true);
      setIsLoading(false);
    } else {
      filterMenu(menu_id);
    }
  };

  const filterMenu = (menu_id: string) => {
    for (const index in categories) {
      const menuItem = categories[index].category_menu_items.filter(
        (i) => i.menu_itemsId === +menu_id
      )[0];

      if (menuItem) {
        setMenu(menuItem);
        break;
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className=" py-[20px] bg-softdark px-[10px] relative rounded-t-[20px]">
        <div className="flex justify-between items-center pb-[10px]">
          <h1 className="pb-[10px] text-[20px] text-white">
            {isExist ? "Update cart" : "Add to cart"}
          </h1>
          <button
            onClick={() => navigate(`/order?company_id=${company_id}`)}
            className="text-white absolute top-[20px] right-[20px] text-[30px]"
          >
            <BsX />
          </button>{" "}
        </div>

        <div className="w-full flex items-center space-x-[20px]">
          <img
            src={menu.menu_items?.image_url || ""}
            className=" h-[125px] w-[150px] object-cover rounded-[10px]"
            alt=""
          />
          <div className="space-y-[20px]">
            <div className="text-white">
              <h1 className="text-[20px] font-bold">{menu.menu_items?.name}</h1>
              <p className="text-primary font-medium">
                {menu.menu_items?.price}{" "}
                <span className="text-[13px]">{"MMK" || ""}</span>
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

        {menu.menu_items?.options.length ? (
          <div className="pt-[20px] last-of-type:pb-[30px]">
            <h1 className="text-gray-300 font-bold text-[25px] pb-[15px]">
              Options
            </h1>
            <form className="flex flex-col space-y-[20px]">
              {menu.menu_items?.options?.map((o) =>
                o.choices.length ? (
                  o.isRequired ? (
                    <OptionRadioBox
                      chosenChoice={choices}
                      addChoice={addRequireChoice}
                      option={o}
                      key={o.id}
                    />
                  ) : (
                    <OptionCheckBox
                      chosenChoice={choices}
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
        )}

        <BtnPrimary
          className="text-white w-full mt-[20px] fixed bottom-0 left-0 py-[20px]"
          onClick={() => menuAddToCart()}
          disabled={isDisable}
        >
          {isExist ? "Update cart" : "Add to cart"}
        </BtnPrimary>
      </div>
    </>
  );
};
