import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import DrawingContextProvider from './context/drawing-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DrawingContextProvider>
        <App />
      </DrawingContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
