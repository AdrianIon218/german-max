import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { Provider } from 'react-redux';
import "../sass/index.scss";
import { createStore } from '@reduxjs/toolkit';

const x = createStore(function reducer(){});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={x}>
      <App />
    </Provider>
  </React.StrictMode>,
)
