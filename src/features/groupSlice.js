import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGroup: null,
  status: "idle",
};

export const groupSlice = createSlice({
  name: "group",
  initialState,

  reducers: {
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
});

export const { setSelectedGroup } = groupSlice.actions;

export const selectCurrentGroup = (state) => state.group.selectedGroup;

export default groupSlice.reducer;
