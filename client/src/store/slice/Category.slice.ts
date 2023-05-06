import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";

interface initialState {
  categories: Category[] | [];
  noneCategories: Category;
}

const initialState: initialState = {
  categories: [],
  noneCategories: {} as Category,
};

const CategorySlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.categories = action.payload;
      state.noneCategories = state.categories.filter(i => i.id === null)[0]
    },

    insertCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    updateCategory: (state, action) => {
      const { id, payload } = action.payload;
      state.categories = state.categories.map((i) =>
        i.id === id ? payload : i
      );
    },
    dropCategory: (state, action) => {
      state.categories = state.categories.filter(
        (i) => i.id !== action.payload
      );
    },
  },
});

export const { storeCategories, insertCategory, updateCategory, dropCategory } =
  CategorySlice.actions;
export default CategorySlice.reducer;
