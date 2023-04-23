import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../components/theme";
import { IoOptionsSharp } from "react-icons/io5";
import { useLazyGetOrdersQuery } from "../store/service/order-endpoints/Order.endpoints";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { storeActiveOrder, storeOrders } from "../store/slice/AdminOrder.slice";
import { toast } from "react-hot-toast";
import { MediumLoader } from "../components/loader";
import {
  AdminOrderRow,
  AdminOrderSidebar,
  AdminOrderlineCard,
} from "../components/admin_order";

export const AdminOrder = () => {
  const [getOrders, response] = useLazyGetOrdersQuery();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.adminOrder.orders);
  const activeOrder = useSelector(
    (state: RootState) => state.adminOrder.activeOrder
  );

  useEffect(() => {
    getOrders("");
  }, []);

  useEffect(() => {
    if (response.isSuccess && !response.isFetching) {
      dispatch(storeOrders(response.data));
      dispatch(storeActiveOrder(response.data[0]));
      setIsLoading(false);
    } else if (response.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [response]);

  return (
    <LayoutProvider>
      {isLoading ? (
        <MediumLoader />
      ) : (
        <div className="w-full mx flex justify-between">
          <div className="w-[calc(100%-450px)] h-[85vh] bg-dark p-[20px] rounded-[10px]">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-[25px] font-bold">Your Orders</h1>
              <button className="flex items-center py-[7px] px-[10px] rounded-[5px] border border-softestdark space-x-[10px]">
                <IoOptionsSharp className="text-[20px]" />
                <span className="text-[14px]">Filter Orders</span>
              </button>
            </div>

            {orders.map((order) => (
              <AdminOrderRow order={order} key={order.id} />
            ))}
          </div>
          <AdminOrderSidebar />
        </div>
      )}
    </LayoutProvider>
  );
};
