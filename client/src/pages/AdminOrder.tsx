import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../components/theme";
import { IoOptionsSharp } from "react-icons/io5";
import { useLazyGetOrdersQuery } from "../store/service/order-endpoints/Order.endpoints";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { storeActiveOrder, storeOrders } from "../store/slice/AdminOrder.slice";
import { toast } from "react-hot-toast";
import { MediumLoader } from "../components/loader";
import { AdminOrderRow, AdminOrderSidebar } from "../components/admin_order";
import { Order } from "../types";
import { Button, Menu, MenuItem } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";

type filterText = "all" | "pending" | "complete" | "preparing";

export const AdminOrder = () => {
  const [getOrders, response] = useLazyGetOrdersQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [filterBox, setFilterBox] = React.useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<filterText>("all");
  const [showOrder, setShowOrder] = useState<Order[]>([]);
  const [activeOrderBox, setActiveOrderBox] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.adminOrder.orders);
  const activeOrder = useSelector(
    (state: RootState) => state.adminOrder.activeOrder
  );
  const filterOpen = Boolean(filterBox);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterBox(event.currentTarget);
  };
  const handleClose = (value: filterText) => {
    setFilterBox(null);
    setFilter(value);
  };

  useEffect(() => {
    if (orders) {
      const show = filterOrder(filter);
      setShowOrder(show);
    }
  }, [filter, orders]);

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

  const filterOrder = (toFilter: filterText): Order[] => {
    if (toFilter == "all") {
      return orders;
    }

    if (toFilter == "complete") {
      return orders.filter((i) =>
        i.order_lines.every((ol) => ol.status === "COMPLETE")
      );
    } else {
      console.log("first");
      return orders.filter((i) =>
        i.order_lines.some((ol) => ol.status === toFilter.toLocaleUpperCase())
      );
    }
  };

  return (
    <LayoutProvider>
      {isLoading ? (
        <MediumLoader />
      ) : (
        <div className="w-full mx flex justify-between">
          <div
            className={`${
              activeOrder ? "md:w-[calc(100%-450px)] w-full" : "w-full"
            } min-h-[85vh] bg-dark p-[20px] rounded-[10px]`}
          >
            <div className="w-full flex justify-between items-center">
              <h1 className="text-[25px] font-bold">Your Orders</h1>
              <div className="flex items-center space-x-[20px]">
                <Button
                  id="demo-positioned-button"
                  aria-controls={
                    filterOpen ? "demo-positioned-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={filterOpen ? "true" : undefined}
                  onClick={handleClick}
                  className="flex items-center py-[7px] px-[10px] rounded-[5px] border border-softestdark space-x-[10px]"
                >
                  <IoOptionsSharp className="text-[20px]" />
                  <span className="text-[14px] capitalize">{filter}</span>
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={filterOpen}
                  onClose={() => handleClose(filter)}
                  anchorEl={filterBox}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => handleClose("all")}>All</MenuItem>
                  <MenuItem onClick={() => handleClose("pending")}>
                    Pending
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("preparing")}>
                    Preparing
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("complete")}>
                    Complete
                  </MenuItem>
                </Menu>
                <button
                  className=" md:hidden flex items-center py-[7px] px-[10px] rounded-[5px] border border-softestdark space-x-[10px]"
                  onClick={() => setActiveOrderBox(!activeOrderBox)}
                >
                  <AiOutlineEye className="text-[20px]" />
                  <span className="text-[14px] capitalize">
                    View Active Order
                  </span>
                </button>
              </div>
            </div>

            {showOrder.length ? (
              showOrder.map((order) => (
                <AdminOrderRow order={order} key={order.id} />
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-center text-[30px] font-semibold py-[20px]">
                  No Order Exist
                </h1>
              </div>
            )}
          </div>
          {activeOrder ? (
            <AdminOrderSidebar
              setOpen={setActiveOrderBox}
              open={activeOrderBox}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </LayoutProvider>
  );
};
