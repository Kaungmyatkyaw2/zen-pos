import React, { useEffect, useState } from "react";
import { BtnPrimary } from "../form";
import { OrderMenuCartCard } from "./OrderMenuCartCard";
import { Drawer } from "@mui/material";
import { BsX } from "react-icons/bs";
import { useCreateOrderMutation } from "../../store/service/order-endpoints/Order.endpoints";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { emptyCart } from "../../store/slice/CustomerOrder";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: PropType) => {
  const [createOrder, response] = useCreateOrderMutation();
  const cart = useSelector((state: RootState) => state.customerOrder.cart);
  const user = useSelector((state: RootState) => state.user.user);
  const company = useSelector(
    (state: RootState) => state.customerOrder.company
  );
  const query = useQuery();
  const company_id = query.get("company_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(emptyCart([]));
      navigate(`/order/status?id=${response.data.id}`);
    } else if (response.isError) {
      toast.error("An error occured");
    }
  }, [response]);

  const handleCreateOrder = () => {
    const payload = {
      orderline: cart,
      company_id,
      taxRate: company?.tax_rate,
      chargeRate: company?.charge_rate,
      customer_id: user?.id,
    };
    createOrder(payload);
  };

  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
        },
      }}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
      onClose={() => onClose()}
    >
      <div className="w-full h-[100vh] bg-dark p-[20px] text-white relative">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-bold">Your Cart</h1>
          <button
            onClick={() => onClose()}
            className="text-[29px] text-primary font-bold"
          >
            <BsX />
          </button>
        </div>
        <div className="space-y-[20px] pt-[20px]">
          {cart.length ? (
            cart.map((mc, index) => (
              <OrderMenuCartCard key={index} cartMenu={mc} />
            ))
          ) : (
            <h1 className="text-[20px] font-medium text-center">
              No Order Yet
            </h1>
          )}
        </div>
        <BtnPrimary
          disabled={response.isLoading || !cart.length}
          isLoading={response.isLoading}
          onClick={handleCreateOrder}
          width={"full"}
          className="fixed bottom-0 left-0 rounded-none py-[30px]"
        >
          Confirm Order
        </BtnPrimary>
      </div>
    </Drawer>
  );
};
