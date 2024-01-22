import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./NotificationSlice.ts";
import loadingReducer from "./LoadingSlice.ts";
import TransitionReducer from "./TransitionSlice.ts";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    pageTransition: TransitionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
