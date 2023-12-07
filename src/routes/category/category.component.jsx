import { useContext, useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import DeleteCategoryConfirmModal from "../../components/delete-category-confirm-modal/delete-category-confirm-modal";
import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";

import { CategoriesContext } from "../../contexts/categories.context";
import { getCategoriesAndDocuments, removeSectionFromCollection } from "../../utils/firebase/firebase.utils";

import { AdminContext } from "../../contexts/admin.context";
import { TypeContext } from "../../contexts/type.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap, setCategoriesMap } = useContext(CategoriesContext);
  const { type, setType } = useContext(TypeContext);
  const { isAdmin } = useContext(AdminContext);

  const [products, setProducts] = useState(categoriesMap[category]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const CATEGORY = category.toUpperCase().replace(/_/g, " ");

  const navigate = useNavigate();

  const removeSectionFromCollectionDB = () => {
    const collectionKey = "collections";
    const sectionTitleToRemove = category;

    removeSectionFromCollection(collectionKey, sectionTitleToRemove, async () => {
      const updatedCategories = await getCategoriesAndDocuments('collections');
      setCategoriesMap(updatedCategories);
      navigate('/shop');
      Swal.fire({
        title: `${CATEGORY} removed from collection successfully!`,
        timer: 3000
      });
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
      <>
        <h2 className="category-title">You are in {CATEGORY} section</h2>
        <div className="buttons-container">
          <Button buttonType='neon'
            onClick={() => { setShowDeleteModal(true) }}
          >
            Delete {CATEGORY} from DB
          </Button>
          <Link to={`/add-item-input-form`}><Button buttonType='neon'>Add new item to {CATEGORY}</Button></Link>
        </div>
        </>
      ) : (
        <h2 className="category-title">{CATEGORY}</h2>
      )}
      <br />
      <div style={{marginBottom: '70px'}}>
      <div className="category-container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              documentId={category}
            />
          ))
        ) : (
          <h2 className="no-items">There are no products</h2>
        )}
      </div>
      </div>
      {showDeleteModal && <DeleteCategoryConfirmModal
        category={CATEGORY}
        deleteCategory={removeSectionFromCollectionDB}
        closeModal={() => setShowDeleteModal(false)} />}
    </Fragment>
  );
};

export default Category;
