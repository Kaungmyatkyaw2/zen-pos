import { createSlice } from "@reduxjs/toolkit";
import {
  Category,
  Category_Menu_Items,
  Company,
  RTK_CusOrder,
} from "../../types";

interface initialState {
  categories: Category[] | [];
  company: Company | null;
  cart: RTK_CusOrder[] | [];
}

const initialState: initialState = {
  categories: [],
  company: null,
  cart: [],
};

const CustomerOrder = createSlice({
  name: "CustomerOrder",
  initialState,
  reducers: {
    storeInfo: (state, action) => {
      const data = action.payload;
      state.company = data;
      state.categories = data.category;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    editCart: (state, action) => {
      const { id, payload } = action.payload;
      state.cart = state.cart.map((i) =>
        i.menu.menu_itemsId === id ? { ...payload } : i
      );
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (i) => i.menu.menu_items.id !== action.payload
      );
    },
  },
});

export const { storeInfo, addToCart, editCart, removeFromCart } =
  CustomerOrder.actions;
export default CustomerOrder.reducer;
