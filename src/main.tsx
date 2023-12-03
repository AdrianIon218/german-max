import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import "../sass/index.scss";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './SliceReducers/NotificationSlice.ts';


const store = configureStore({
  reducer:{
    notification: notificationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
