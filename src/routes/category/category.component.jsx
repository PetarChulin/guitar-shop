import { useContext, useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";

import { CategoriesContext } from "../../contexts/categories.context";
import { removeSectionFromCollection } from "../../utils/firebase/firebase.utils";

import { AdminContext } from "../../contexts/admin.context";
import { TypeContext } from "../../contexts/type.context";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const { type, setType } = useContext(TypeContext);
  const { isAdmin } = useContext(AdminContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  const CATEGORY = category.toUpperCase().replace(/_/g, " ");

  const removeSectionFromCollectionDB = () => {
    const collectionKey = "collections";
    const sectionTitleToRemove = category;

    Swal.fire({
      title: `Delete ${CATEGORY}, are you sure?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        removeSectionFromCollection(collectionKey, sectionTitleToRemove);
        Swal.fire({
          title: `${CATEGORY} removed from collection successfully! Please refresh the page.`,
          timer: 3000
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    setProducts(categoriesMap[category]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category, categoriesMap]);


  useEffect(() => {
    setType(category);
  }, [type]);


  return (
    <Fragment>
      {isAdmin ? (
        <div className="buttons-container">
          <Button buttonType='neon'
            onClick={removeSectionFromCollectionDB}
          >
            Delete {CATEGORY} from DB
          </Button>
          <Link to={`/add-item-input-form`}><Button buttonType='neon'>Add new item to {CATEGORY}</Button></Link>
        </div>
      ) : (
        <h2 className="category-title">{CATEGORY}</h2>
      )}
      <br />
      <div className="category-container">
        {products ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              documentId={category}
            />
          ))
        ) : (
          <p>There are no products</p>
        )}
      </div>
    </Fragment>
  );
};

export default Category;
