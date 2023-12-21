import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import "../sass/index.scss";
import { Provider } from 'react-redux';
import store from './SliceReducers/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:60*1000
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <App />
        </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
