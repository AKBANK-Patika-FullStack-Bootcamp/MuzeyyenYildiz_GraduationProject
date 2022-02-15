import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "userData",
  initialState: {
    value: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserData } = userData.actions;

export default userData.reducer;
