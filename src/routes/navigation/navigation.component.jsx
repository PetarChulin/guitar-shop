import { React, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { AdminContext } from "../../contexts/admin.context";

import { default as Guitar} from "../../assets/guitar-logo.png"
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import SignInOutToast from "../../components/sign-in-form/sign-in-out.toast";

const Navigation = () => {
  const { currentUser, username, setUsername } = useContext(UserContext);
  const { isCartOpen, setCartCount } = useContext(CartContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const setAdminFalse = () => {
    setIsAdmin(false);
  };


  const signOut = () => {
    signOutUser();
    SignInOutToast(username, 'sign out successfully.', "warning", "bottom-left");
    setIsAdmin(false);
    setUsername("");
    setCartCount(0);
    navigate('/')

  };



  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/" title="go to home">
          <img src={Guitar} style={{width: '130px' , height: '130px'}} />
        </Link>
    <div className="title-container">Guitar Shop</div>
    {currentUser && <div className="welcome-container">Welcome {username}</div>}
        <div className="nav-links-container">
          {isAdmin ? <Link className="nav-link" to="/admin">
            <span className="nav-link">
              ADMIN
            </span>
          </Link> :
          <Link className="nav-link" to="/shop" onClick={setAdminFalse}>
            SHOP
          </Link>}
          {currentUser ? (
            <span className="nav-link" onClick={signOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/signin">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
