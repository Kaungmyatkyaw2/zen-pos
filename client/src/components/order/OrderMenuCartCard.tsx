import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RTK_CusOrder } from "../../types";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slice/CustomerOrder";

interface PropType {
  cartMenu: RTK_CusOrder;
}

export const OrderMenuCartCard = ({ cartMenu }: PropType) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartMenu.menu.menu_itemsId));
  };

  return (
    <div className="w-full bg-softdark h-[100px] flex overflow-hidden rounded-[10px] relative">
      <div className="absolute top-[10px] right-[10px] space-x-[10px]">
        <button className="text-red-500" onClick={handleRemoveFromCart}>
          <AiOutlineDelete />
        </button>
        <button className="text-blue-500">
          <AiOutlineEdit />
        </button>
      </div>
      <img
        className="min-w-[130px] h-full object-cover"
        src={cartMenu.menu.menu_items.image_url || ""}
        alt=""
      />
      <div className="w-full flex flex-col justify-center px-[20px] space-y-[5px]">
        <h1 className="font-medium">
          {cartMenu.menu.menu_items.name}{" "}
          <span> (Qty - {cartMenu.quantity})</span>
        </h1>
        <h1 className="text-[12px] text-gray-400">
          (
          {cartMenu.choices.map(
            (i, index) =>
              ` ${i.name} ${index !== cartMenu.choices.length - 1 ? "," : ""}`
          )}
          )
        </h1>
        <p className="text-[14px] text-gray-400">{cartMenu.description}</p>
      </div>
    </div>
  );
};
