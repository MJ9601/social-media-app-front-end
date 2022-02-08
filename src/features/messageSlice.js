import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMsg: null,
  status: "idle",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setCurrentMsg: (state, action) => {
      state.currentMsg = action.payload;
    },
  },
});

export const { setCurrentMsg } = messageSlice.actions;

export const selectCurrentMsg = (state) => state.message.currentMsg;

export default messageSlice.reducer;
