import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Storefront from './pages/Storefront.jsx';
import Admin from './pages/Admin.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import { seedOrdersIfEmpty } from './lib/storage.js';
import { registerPwa } from './lib/pwa.js';

seedOrdersIfEmpty();
registerPwa();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"                       element={<Storefront />} />
        <Route path="/admin"                  element={<Admin />} />
        <Route path="/admin/orders/:id"       element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
