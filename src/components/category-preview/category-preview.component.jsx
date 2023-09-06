import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {

  const CATEGORY = title.toUpperCase().replace(/_/g, " ");

  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' title='click for more' to={title}>
          {CATEGORY}
        </Link>
      </h2>
      <div className='preview'>
        {products
          .filter((_, idx) => idx < 5)
          .map((product) => (
            <ProductCard key={product.id} product={product} title={title}/>
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
