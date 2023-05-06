import { createSlice } from "@reduxjs/toolkit";
import { Category, Company, RTK_CusOrder } from "../../types";

interface initialState {
  categories: Category[] | [];
  company: Company | null;
  companies: Company[];
  cart: RTK_CusOrder[] | [];
}

const initialState: initialState = {
  categories: [],
  company: null,
  cart: [],
  companies: [],
};

const CustomerOrder = createSlice({
  name: "CustomerOrder",
  initialState,
  reducers: {
    storeCompanies: (state, action) => {
      state.companies = action.payload;
    },
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
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  storeInfo,
  addToCart,
  editCart,
  removeFromCart,
  storeCompanies,
  emptyCart,
} = CustomerOrder.actions;
export default CustomerOrder.reducer;
