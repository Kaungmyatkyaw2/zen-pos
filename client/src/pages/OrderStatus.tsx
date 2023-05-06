import React, { useEffect, useState } from "react";
import { OrderBanner } from "../components/order";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "../helper";
import { useLazyGetOrderQuery } from "../store/service/order-endpoints/Order.endpoints";
import { Order } from "../types";
import { ScreenLoader } from "../components/loader";
import { OrderStatusLineCard } from "../components/order_status";

export const OrderStatus = () => {
  const company = useSelector(
    (state: RootState) => state.customerOrder.company
  );
  const [getOrder, response] = useLazyGetOrderQuery();
  const [orders, setOrders] = useState<Order>({} as Order);
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const id = query.get("id");

  useEffect(() => {
    if (response.isSuccess) {
      if (!response.isFetching) {
        setOrders(response.data);
        setIsLoading(false);
      }
    } else if (response.isError && !response.isFetching) {
      setIsLoading(false);
    }
  }, [response]);

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id]);

  return (
    <>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <div>
          <OrderBanner>{company?.name}</OrderBanner>
          <div className=" px-[20px] pt-[60px]">
            {orders.order_lines.map((i) => (
              <OrderStatusLineCard
                key={i.id}
                orderline={i}
                className="mt-[20px]"
              ></OrderStatusLineCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
