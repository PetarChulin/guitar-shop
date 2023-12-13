import { useContext, Fragment, } from 'react';
import { Zoom, JackInTheBox, Bounce } from 'react-awesome-reveal';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      <Bounce triggerOnce={true}>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
      </Bounce>
    </Fragment>
  );
};

export default CategoriesPreview;
