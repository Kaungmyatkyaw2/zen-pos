import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AdminOrderlineCard } from "./AdminOrderlineCard";
import { BtnPrimary } from "../form";
import { useUpdateOrderStatusMutation } from "../../store/service/order-endpoints/Order.endpoints";
import { updateActiveOrder } from "../../store/slice/AdminOrder.slice";

export const AdminOrderSidebar = () => {
  const activeOrder = useSelector(
    (state: RootState) => state.adminOrder.activeOrder
  );
  const [update, response] = useUpdateOrderStatusMutation();
  const [status, setStatus] = useState("Pending");
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPending = activeOrder?.order_lines.some(
      (i) => i.status === "PENDING"
    );
    const checkComplete = activeOrder?.order_lines.every(
      (i) => i.status === "COMPLETE"
    );

    if (!checkPending && !checkComplete) {
      setStatus("Preparing");
      return;
    }

    if (checkComplete) {
      setStatus("Complete");
      return;
    }

    setStatus("Pending");
  }, [activeOrder]);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(
        updateActiveOrder({
          ...activeOrder,
          order_lines: activeOrder?.order_lines.map((i) =>
            i.status === "PENDING" ? { ...i, status: "PREPARING" } : i
          ),
        })
      );
    }
  }, [response]);

  const acceptOrder = () => {
    const payload = {
      whichStatus: "PENDING",
      updateStatus: "PREPARING",
    };
    update({ id: activeOrder?.id, data: payload });
  };

  return (
    <div className="w-[400px] h-[85vh] bg-softestdark rounded-[10px] p-[20px] relative">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Order id</p>
          <h1 className="font-bold"># {activeOrder?.id}</h1>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-400">Customer</p>
          <h1 className="font-bold">{activeOrder?.customer.name}</h1>
        </div>
      </div>
      <div className="pt-[30px] space-y-[30px] h-[88%] overflow-scroll scrollbar-hide pb-[50px]">
        {activeOrder?.order_lines.map((orderline) => (
          <AdminOrderlineCard orderline={orderline} />
        ))}
      </div>
      <BtnPrimary
        onClick={acceptOrder}
        isLoading={response.isLoading}
        disabled={status === "Preparing"}
        className="py-[23px] rounded-[10px] w-[calc(100%-40px)] absolute left-[50%] bottom-[20px] translate-x-[-50%]"
      >
        {status === "Pending"
          ? "Accept"
          : status === "Complete"
          ? "Print Bill"
          : "Preparing"}
      </BtnPrimary>
    </div>
  );
};
