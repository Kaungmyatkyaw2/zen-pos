import { createSlice } from "@reduxjs/toolkit";
import { Company, User } from "../../types";

interface initialState {
  user: User | undefined;
  company: Company | undefined;
}

const initialState: initialState = {
  user: undefined,
  company: undefined,
};

const UserSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    insertUser: (state, action) => {
      state.user = action.payload;
    },
    insertCompany: (state, action) => {
      state.company = action.payload;
    },
  },
  extraReducers: {
    ["Auth/logout"]: (state, action) => {
      state.company = undefined;
      state.user = undefined;
    },
  },
});

export const { insertUser, insertCompany } = UserSlicer.actions;
export default UserSlicer.reducer;
