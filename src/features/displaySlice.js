import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  delUser: false,
  status: "idle",
};

export const displaySlice = createSlice({
  name: "display",
  initialState,

  reducers: {
    ToggleDelUser: (state) => {
      state.delUser = !state.delUser;
    },
    
  },
});

export const { ToggleDelUser } = displaySlice.actions;

export const selectDelUser = (state) => state.display.delUser;

export default displaySlice.reducer;
