import React, { useState, useEffect } from "react";
import { Order } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { storeActiveOrder } from "../../store/slice/AdminOrder.slice";

interface Props {
  order: Order;
}

export const AdminOrderRow = ({ order }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const activeOrder = useSelector(
    (state: RootState) => state.adminOrder.activeOrder
  );
  const dispatch = useDispatch();
  const createdDate = new Date(order.createdAt);
  const amOrpm = createdDate.getHours() > 12 ? " PM" : " AM";

  const [status, setStatus] = useState("Pending");

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
  }, [order]);




  return (
    <>
      <div
        className={`w-full p-[20px] rounded-[10px] bg-softestdark mt-[20px]   cursor-pointer ${
          activeOrder?.id === order.id ? "border-primary border" : ""
        }`}
        onClick={() => dispatch(storeActiveOrder(order))}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Order # {order.id}</h1>
          <p className="font-medium text-gray-400">
            {createdDate.getHours() + ":" + createdDate.getMinutes() + amOrpm}
          </p>
        </div>
        <div className="pt-[10px] flex justify-between items-center">
          <div>
            <p className="text-[14px]">Name : Kaung Myat Kyaw</p>
            <p className="text-[13px] text-gray-400">
              Qty - {order.order_lines.length}
            </p>
          </div>
          <div className="flex items-center space-x-[10px]">
            <h1 className="text-[21px] font-bold">
              {user.company?.currency} {order.amount}
            </h1>
            <button className="p-[3px] px-[15px] text-[12px] rounded-full bg-green-400 text-white">
              {status}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
