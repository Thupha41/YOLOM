import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import ShopContextProvider from './context/ShopContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <App/>
  </ShopContextProvider>,
)
