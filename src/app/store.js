import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import displayReducer from "../features/displaySlice";
import groupReducer from "../features/groupSlice";
import messageReducer from "../features/messageSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    group: groupReducer,
    display: displayReducer,
    user: userReducer,
    counter: counterReducer,
  },
});
