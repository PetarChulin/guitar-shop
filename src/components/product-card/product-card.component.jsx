import { useContext, useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import Button from "../button/button.component";
import InputFormEditItem from "../edit-item-form/form-input-edit-item";

import { CartContext } from "../../contexts/cart.context";
import { AdminContext } from "../../contexts/admin.context";
import { UserContext } from "../../contexts/user.context";
import { CategoriesContext } from "../../contexts/categories.context";

import { getCategoriesAndDocuments, removeItemFromDocument } from "../../utils/firebase/firebase.utils";
import { default as Img } from '../../assets/favorite-50.png';
import { default as ImgBlack } from '../../assets/favorite-black-50.png';
import { FavoriteContext } from "../../contexts/favorites.context";
import "./product-card.styles.scss";

const ProductCard = ({ product, documentId }) => {
  const { id, name, price, imageUrl, description, showPrice = true, showBtns = true } = product;
  const { addItemToCart, removeItemToCart, cartItems } = useContext(CartContext);
  const { isAdmin } = useContext(AdminContext);
  const { currentUser } = useContext(UserContext);
  const { favoriteItems, setFavoriteItems, addItemToFavorites, removeItemFromFavorites } = useContext(FavoriteContext);
  const { categoriesMap, setCategoriesMap } = useContext(CategoriesContext);
  const [showEditForm, setShowEditForm] = useState(false);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const favoriteItem = favoriteItems.find((favorite) => favorite.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 0;
  const isFavorite = favoriteItem ? favoriteItem.isFavorite : false;

  const addProductToCart = () => addItemToCart(product);

  const addProductToFavorites = () => addItemToFavorites(product);

  const removeProductFromFavorites = () => removeItemFromFavorites(product);

  const showBtnsRef = useRef(showBtns);
console.log(categoriesMap);

  useEffect(() => {
    if (documentId === undefined) {
      showBtnsRef.current = false;
    }
  }, [documentId]);

  const removeProductFromCart = () => {
    removeItemToCart(product);
  };

  const handleEditItem = async () => {
    setShowEditForm(true);
  };

  const handleRemoveItem = async (itemId) => {

    const collectionName = "collections";

    Swal.fire({
      title: `Delete ${name}, are you sure?`,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItemFromDocument(collectionName, documentId, itemId, name, async () => {
          const updatedCategories = await getCategoriesAndDocuments('collections');
          setCategoriesMap(updatedCategories);
          const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");
          Swal.fire({
            title: `${name} removed from ${CATEGORY}'s field successfully!`,
            timer: 3000
          });
        });
      } else if (result.isDenied) {
        return;
      }
    });

  };

  const showDetails = async () => {

    Swal.fire({
      title: name,
      html: `${description} <br> Price: ${price} $`,
      imageUrl: imageUrl,
      showDenyButton: true,
      showConfirmButton: currentUser,
      confirmButtonText: 'Add to cart',
      denyButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        addProductToCart();
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <>
      <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`} />
        {currentUser && !isAdmin && (
          <>
            {!isFavorite
              ? <img src={Img} alt="Favorite" className="favorite-icon" onClick={addProductToFavorites} />
              : <img src={ImgBlack} alt="Favorite" className="favorite-icon" onClick={removeProductFromFavorites} />}
          </>)}
        <div className="footer">
          <span className="name">{name}</span>
          {showPrice && <span className="price">{`Price: ${price} $`}</span>}
          <div></div>
        </div>
        {isAdmin ? (
          <>
            {showBtnsRef.current && <>
              <Button style={{ top: '200px' }} buttonType="neon" onClick={() => { handleRemoveItem(id) }}>Remove</Button>
              <Button style={{ top: '260px' }} buttonType="neon" onClick={handleEditItem}>Edit</Button></>}
          </>
        ) : (
          <>
            <Button style={{ top: '200px' }} buttonType="neon" onClick={showDetails} title="click for details">Details</Button>
            {currentUser && showBtns &&
              <>
                <Button buttonType="neon" onClick={addProductToCart}>
                  Add to cart
                </Button>
                {quantity >= 1 && <Button style={{ top: '145px' }} buttonType="neon" onClick={removeProductFromCart}>
                  Remove from cart
                </Button>}
              </>}
          </>
        )}
      </div>
      {showEditForm && <InputFormEditItem product={product} documentId={documentId} closeForm={() => setShowEditForm(false)} />}
    </>
  );
};

export default ProductCard;
