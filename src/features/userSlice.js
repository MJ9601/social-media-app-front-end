import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
    LOGOUT: (state) => {
      state.user = null;
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
