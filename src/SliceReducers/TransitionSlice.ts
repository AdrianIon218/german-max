import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTransitioning: false,
  pageTarget: "",
};

const transitionSlice = createSlice({
  name: "transition",
  initialState,
  reducers: {
    startTransition(state, action) {
      state.isTransitioning = true;
      state.pageTarget = action.payload;
    },
    stopTransition(state) {
      state.isTransitioning = false;
      state.pageTarget = "";
    },
  },
});

export const { startTransition, stopTransition } = transitionSlice.actions;

export default transitionSlice.reducer;
