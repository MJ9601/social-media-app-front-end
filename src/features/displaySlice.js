import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  delUser: false,
  createGroup: false,
  showSettingGroup: false,
  delGroup: false,
  showSearchMsg: false,
  showOptionMsg: false,
  showForwardWin: false,
  status: "idle",
};

export const displaySlice = createSlice({
  name: "display",
  initialState,

  reducers: {
    ToggleDelUser: (state) => {
      state.delUser = !state.delUser;
    },
    ToggleDelGroup: (state) => {
      state.delGroup = !state.delGroup;
    },
    ToggleCreateGroup: (state) => {
      state.createGroup = !state.createGroup;
    },
    setShowSettingGroupTrue: (state) => {
      state.showSettingGroup = true;
    },
    setShowSettingGroupFalse: (state) => {
      state.showSettingGroup = false;
    },
    setShowSearchMsgTrue: (state) => {
      state.showSearchMsg = true;
    },
    setShowSearchMsgFalse: (state) => {
      state.showSearchMsg = false;
    },
    setShowOptionMsgTrue: (state) => {
      state.showOptionMsg = true;
    },
    setShowOptionMsgFalse: (state) => {
      state.showOptionMsg = false;
    },
    setShowForwardWinTrue: (state) => {
      state.showForwardWin = true;
    },
    setShowForwardWinFalse: (state) => {
      state.showForwardWin = false;
    },
  },
});

export const {
  ToggleDelUser,
  ToggleCreateGroup,
  setShowSettingGroupTrue,
  setShowSettingGroupFalse,
  ToggleDelGroup,
  setShowSearchMsgFalse,
  setShowSearchMsgTrue,
  setShowOptionMsgFalse,
  setShowOptionMsgTrue,
  setShowForwardWinFalse,
  setShowForwardWinTrue,
} = displaySlice.actions;

export const selectDelUser = (state) => state.display.delUser;
export const selectDelGroup = (state) => state.display.delGroup;
export const selectCreateGroup = (state) => state.display.createGroup;
export const selectShowSettingGroup = (state) => state.display.showSettingGroup;
export const selectShowSearchMsg = (state) => state.display.showSearchMsg;
export const selectShowOptionMsg = (state) => state.display.showOptionMsg;
export const selectShowForwardWin = (state) => state.display.showForwardWin;

export default displaySlice.reducer;
