import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import displayReducer from "../features/displaySlice";

export const store = configureStore({
  reducer: {
    display: displayReducer,
    user: userReducer,
    counter: counterReducer,
  },
});
