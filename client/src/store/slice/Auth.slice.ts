import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  access_token?: string;
}

const initialState: initialState = {
  access_token: undefined,
};

const AuthSlicer = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem("pos_at", action.payload);
    },
    logout: (state) => {
      state.access_token = undefined;
      localStorage.removeItem("pos_at");
    },
  },
});

export const { login, logout } = AuthSlicer.actions;
export default AuthSlicer.reducer;
