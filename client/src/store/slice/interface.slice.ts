import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  showSidebar: boolean;
}

const initialState: initialState = {
  showSidebar: false,
};

const InterfaceSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleSidebar } = InterfaceSlice.actions;
export default InterfaceSlice.reducer;
