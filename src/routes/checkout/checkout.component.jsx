import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from '../../components/button/button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Swal from 'sweetalert2';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const buyAll = () => {

    const cartItemsHtml = `
    <div style="display: flex; flex-direction: row;">
      ${cartItems.map(cartItem => `
        <div style="margin-right: 20px;">
          <p>${cartItem.name} x ${cartItem.quantity}</p>
          <img src="${cartItem.imageUrl}" alt="${cartItem.name}" style="max-width: 100px;" />
          <p>${cartItem.price * cartItem.quantity} $</p>
        </div>
      `).join('')}
    </div>
  `;

  Swal.fire({
    html: cartItemsHtml
  });
  
  };

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className='total'>Total: ${cartTotal}</span>
      {cartTotal > 0 && <Button buttonType="inverted" onClick={buyAll}>Buy all</Button>}
    </div>
  );
};

export default Checkout;
