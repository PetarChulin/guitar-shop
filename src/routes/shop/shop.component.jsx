import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import setBackgroundImage from '../../utils/background/changeBackgroundImage';
import {default as Img} from '../../assets/guitar15.jpg'
import './shop.styles.scss';

const Shop = () => {

  useEffect(() => {
    setBackgroundImage(Img);
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
