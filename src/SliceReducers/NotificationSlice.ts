import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../Common/Notfication";

const initialState = {
  isShown: false,
  message: "",
  type: NotificationType.NO_TYPE,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: {
      prepare: (message: string, type: NotificationType) => {
        return {
          payload: { message, type },
        };
      },
      reducer(
        state,
        action: PayloadAction<{ message: string; type: NotificationType }>,
      ) {
        state.isShown = true;
        state.message = action.payload.message;
        state.type = action.payload.type;
      },
    },
    hideNotification(state) {
      state.isShown = false;
      state.message = "";
      state.type = NotificationType.NO_TYPE;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
