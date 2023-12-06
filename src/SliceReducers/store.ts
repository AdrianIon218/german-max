import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './NotificationSlice.ts';
import loadingReducer from "./LoadingSlice.ts";

const store = configureStore({
    reducer:{
      notification: notificationReducer,
      loading: loadingReducer
    }
});
  
export type RootState = ReturnType<typeof store.getState>;

export default store;