import React from "react";
import { OrderLine } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface PropType {
  orderline: OrderLine;
}

export const AdminOrderlineCard = ({ orderline }: PropType) => {

  const company = useSelector((state:RootState) => state.user.company)

  return (
      <div className="w-full bg-softdark h-[125px] flex overflow-hidden rounded-[10px] relative">
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
              {orderline.menu_items.price} {company?.currency} x {orderline.quantity}
            </p>
            <h1 className="font-bold">
              {orderline.menu_items.price * orderline.quantity} {company?.currency}
            </h1>
          </div>
        </div>
      </div>
  );
};
