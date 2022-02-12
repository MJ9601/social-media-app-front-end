import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allUsers: null,
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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { LOGIN, LOGOUT, setAllUsers } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAllUsers = (state) => state.user.allUsers;

export default userSlice.reducer;
