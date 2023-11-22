import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Button from "../button/button.component";

import { CartContext } from "../../contexts/cart.context";
import { AdminContext } from "../../contexts/admin.context";
import { UserContext } from "../../contexts/user.context";

import { editItemInDocument, removeItemFromDocument } from "../../utils/firebase/firebase.utils";

import "./product-card.styles.scss";
import InputFormEditItem from "../edit-item-form/form-input-edit-item";

const ProductCard = ({ product, documentId }) => {
  const { id, name, price, imageUrl, description, showPrice = true, showBtns = true } = product;
  const { addItemToCart, removeItemToCart, cartItems } = useContext(CartContext);
  const { isAdmin } = useContext(AdminContext);
  const { currentUser } = useContext(UserContext);
  const [showEditForm, setShowEditForm] = useState(false);

  const cartItem = cartItems.find((item) => item.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 0;

  const addProductToCart = () => addItemToCart(product);


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
        removeItemFromDocument(collectionName, documentId, itemId, name);
        const CATEGORY = documentId.toUpperCase().replace(/_/g, " ");
        Swal.fire({
          title: `${name} removed from ${CATEGORY}'s field successfully! Please refresh the page.`,
          timer: 3000
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
      <img src={imageUrl} alt={`${name}`}/>
      <div className="footer">
        <span className="name">{name}</span>
        {showPrice && <span className="price">{`Price: ${price} $`}</span>}
        <div></div>
      </div>
      {isAdmin ? (
        <>
          <Button style={{ top: '200px' }} buttonType="neon" onClick={() => { handleRemoveItem(id) }}>Remove</Button>
          <Button style={{ top: '260px' }} buttonType="neon" onClick={handleEditItem}>Edit</Button>
        </>
      ) : (
        <>
          <Button style={{ top: '180px' }} buttonType="neon" onClick={showDetails} title="click for details">Details</Button>
          {currentUser && showBtns && <>
            <Button buttonType="neon" onClick={addProductToCart}>
              Add to cart
            </Button>
            {quantity >= 1 && <Button style={{ top: '200px' }} buttonType="neon" onClick={removeProductFromCart}>
              Remove from cart
            </Button>}
          </>}
        </>
      )}
    </div>
      {showEditForm && <InputFormEditItem product={product} documentId={documentId} closeForm={() => setShowEditForm(false)}/>}
      </>
  );
};

export default ProductCard;
