import { useContext } from 'react';

import Image from '../../assets/guitar.png'
import Image2 from '../../assets/guitar2.png'

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({ clearOpen }) => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);


  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={() => { toggleIsCartOpen(); clearOpen(); }}>
      <img src={Image2} className='shopping-icon' title='go to checkout' />
      {cartCount > 0 ? <span className='item-count'>{cartCount}</span>
        : <div className='cart-text'>CART</div>}
    </div>
  );
};

export default CartIcon;
