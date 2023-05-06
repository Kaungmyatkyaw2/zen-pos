import React, { HTMLProps, useEffect, useState } from "react";
import { OrderLine } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface PropType extends HTMLProps<HTMLDivElement> {
  orderline: OrderLine;
}

export const OrderStatusLineCard = ({ orderline, ...rest }: PropType) => {
  const company = useSelector(
    (state: RootState) => state.customerOrder.company
  );
  const [className, setClassName] = useState("text-orange bg-orange");

  useEffect(() => {
    switch (orderline.status) {
      case "PENDING":
        return setClassName("text-orange bg-orange");
        break;

      case "COMPLETE":
        return setClassName("text-green-400 bg-green-400");
        break;

      case "PREPARING":
        return setClassName("text-secondary bg-secondary");
        break;

      default:
        break;
    }
  }, [orderline]);

  return (
    <div
      className={`w-full bg-dark h-[150px] flex overflow-hidden rounded-[10px] relative ${rest.className}`}
    >
      <img
        className="min-w-[130px] h-full object-cover"
        src={orderline.menu_items.image_url || ""}
        alt=""
      />
      <div className="w-full flex flex-col justify-center py-[10px] px-[20px] space-y-[10px]">
        <h1 className="font-medium">
          {orderline.menu_items.name}
          <span> (Qty - {orderline.quantity})</span>
        </h1>
        <h1 className="text-[12px] text-gray-400">
          {orderline.choices.length
            ? orderline.choices.map(
                (i, index) =>
                  ` ${i.name} ${
                    index !== orderline.choices.length - 1 ? "," : ""
                  }`
              )
            : "No Choices"}
        </h1>
        <div className="flex justify-between">
          <p className="text-[14px] text-gray-400">
            {orderline.menu_items.price} {company?.currency} x{" "}
            {orderline.quantity}
          </p>
          <h1 className="font-bold">
            {orderline.menu_items.price * orderline.quantity}{" "}
            {company?.currency}
          </h1>
        </div>
        <button
          className={`p-[3px] px-[15px] text-[12px] rounded-full ${className}  bg-opacity-40`}
        >
          {orderline.status}
        </button>
      </div>
    </div>
  );
};
