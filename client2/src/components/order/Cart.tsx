import React, { useState } from "react";
import { BtnPrimary } from "../form";
import { OrderMenuCartCard } from "./OrderMenuCartCard";
import { Drawer } from "@mui/material";
import { BsX } from "react-icons/bs";
import { useCreateOrderMutation } from "../../store/service/order-endpoints/Order.endpoints";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helper";
import { removeFromCart } from "../../store/slice/CustomerOrder";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: PropType) => {
  const [createOrder, response] = useCreateOrderMutation();
  const cart = useSelector((state: RootState) => state.customerOrder.cart);
  const query = useQuery();
  const company_id = query.get("company_id");

  const handleCreateOrder = () => {
    const payload = { orderline: cart, company_id };
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
          {cart.map((mc, index) => (
            <OrderMenuCartCard key={index} cartMenu={mc} />
          ))}
        </div>
        <BtnPrimary
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
