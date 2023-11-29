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
import { FavoriteProvider } from './contexts/favorites.context';

const rootElement = ReactDOM.createRoot(document.getElementById('root'));

rootElement.render(
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <FavoriteProvider>
            <TypeProvider>
              <CartProvider>
                <AdminProvider>
                  <App />
                </AdminProvider>
              </CartProvider>
            </TypeProvider>
            </FavoriteProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
);
