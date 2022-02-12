import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMsg: null,
  groupMsgs: null,
  status: "idle",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setCurrentMsg: (state, action) => {
      state.currentMsg = action.payload;
    },
    setGroupMsgs: (state, action) => {
      state.groupMsgs = action.payload;
    },
  },
});

export const { setCurrentMsg, setGroupMsgs } = messageSlice.actions;

export const selectCurrentMsg = (state) => state.message.currentMsg;
export const selectGroupMsgs = (state) => state.message.groupMsgs;

export default messageSlice.reducer;
