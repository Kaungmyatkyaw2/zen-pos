import { createSlice } from "@reduxjs/toolkit";
import { Option } from "../../types";

interface initialState {
  options: Option[] | [];
}

const initialState: initialState = {
  options: [],
};

const OptionSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    storeOptions: (state, action) => {
      state.options = action.payload;
    },
    insertOption: (state, action) => {
      state.options = [...state.options, action.payload];
    },
    updateChoice: (state, action) => {
      const { option_id, choice_id, payload } = action.payload;

      state.options = state.options.map((i) =>
        i.id === option_id
          ? {
              ...i,
              choices: i.choices.map((c) =>
                c.id === choice_id ? { ...payload } : c
              ),
            }
          : i
      );
    },
  },
  extraReducers: {
    ["User/insertCompany"]: (state, action) => {
      state.options = action.payload.options;
    },
  },
});

export const { storeOptions, insertOption,updateChoice } = OptionSlice.actions;
export default OptionSlice.reducer;
