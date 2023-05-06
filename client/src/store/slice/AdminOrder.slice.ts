import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types";

interface initialState {
  orders: Order[];
  activeOrder?: Order;
}

const initialState: initialState = {
  orders: [],
};

const AdminOrder = createSlice({
  name: "AdminOrder",
  initialState,
  reducers: {
    storeOrders: (state, action) => {
      state.orders = action.payload;
    },
    storeActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    updateActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
      state.orders = state.orders.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
    updateOrderlineStatus: (state, action) => {
      //@ts-ignore
      state.activeOrder = {
        ...state.activeOrder,
        order_lines:
          state.activeOrder?.order_lines.map((i) =>
            i.id === action.payload.id ? action.payload : i
          ) || [],
      };
      state.orders = state.orders.map((i) =>
        i.id === action.payload.orderId
          ? {
              ...i,
              order_lines:
                i?.order_lines.map((ol) =>
                  ol.id === action.payload.id ? action.payload : ol
                ) || [],
            }
          : i
      );
    },
  },
});

export const { storeOrders, storeActiveOrder, updateActiveOrder,updateOrderlineStatus } =
  AdminOrder.actions;
export default AdminOrder.reducer;
