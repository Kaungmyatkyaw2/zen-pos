import React, { useEffect, useState } from "react";
import { OrderLine } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BtnPrimary } from "../form";
import { useUpdateOrderlineStatusMutation } from "../../store/service/orderline-endpoints/Orderline.endpoints";
import { updateOrderlineStatus } from "../../store/slice/AdminOrder.slice";

interface PropType {
  orderline: OrderLine;
}

export const AdminOrderlineCard = ({ orderline }: PropType) => {
  const company = useSelector((state: RootState) => state.user.company);
  const [update, response] = useUpdateOrderlineStatusMutation();
  const [updateStatus, setUpdateStatus] = useState("COMPLETE");
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdateStatus(orderline.status == "PREPARING" ? "COMPLETE" : "PREPARING");
  }, [orderline]);

  useEffect(() => {
    if (response.isSuccess) {
      const payload = {
        ...orderline,
        status: updateStatus,
      };
      dispatch(updateOrderlineStatus(payload));
    }
  }, [response]);

  const handleUpdateStatus = () => {
    update({ id: orderline.id, data: { status: updateStatus } });
  };

  return (
    <div className="w-full bg-softdark h-[145px] flex overflow-hidden rounded-[10px] relative">
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
        {orderline.status !== "PENDING" && (
          <BtnPrimary
            onClick={handleUpdateStatus}
            disabled={response.isLoading}
            isLoading={response.isLoading}
            className={`${
              orderline.status === "COMPLETE" &&
              "!bg-red-400 !bg-opacity-40 !text-red-400 !py-[15px]"
            }`}
          >
            {orderline.status === "PREPARING" ? "Complete" : "Undo Complete"}
          </BtnPrimary>
        )}
      </div>
    </div>
  );
};
