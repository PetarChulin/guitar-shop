import { useContext } from 'react';

import Image from '../../assets/guitar.png'

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({ clearOpen }) => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);


  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container'  onClick={() => { toggleIsCartOpen(); clearOpen();}}>
      <img src={Image} className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
