import { createSlice } from "@reduxjs/toolkit";
import {
  Order,
} from "../../types";

interface initialState {
  orders : Order[],
  activeOrder? : Order
}

const initialState: initialState = {
  orders : []
};

const AdminOrder = createSlice({
  name: "AdminOrder",
  initialState,
  reducers: {
    storeOrders : (state,action) => {
        state.orders = action.payload;
    },
    storeActiveOrder : (state,action) => {
      state.activeOrder = action.payload
    }
  },
});

export const {storeOrders,storeActiveOrder} =
  AdminOrder.actions;
export default AdminOrder.reducer;
