import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
// import { Provider } from 'react-redux';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import { AdminProvider } from './contexts/admin.context';
import { TypeProvider } from './contexts/type.context';
import './index.scss';

const rootElement = ReactDOM.createRoot(document.getElementById('root'));

rootElement.render(
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <TypeProvider>
              <CartProvider>
                <AdminProvider>
                  <App />
                </AdminProvider>
              </CartProvider>
            </TypeProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
);
