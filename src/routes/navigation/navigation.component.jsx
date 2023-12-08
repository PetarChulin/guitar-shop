import { React, Fragment, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import { collection, getDocs, getFirestore } from "firebase/firestore";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import SignInOutToast from "../../components/sign-in-form/sign-in-out.toast";
import ProductCard from "../../components/product-card/product-card.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { AdminContext } from "../../contexts/admin.context";
import { FavoriteContext } from "../../contexts/favorites.context";

import { nameExtract } from "../../utils/nameExtract";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { default as Guitar } from "../../assets/guitar-logo.png"

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, username, setUsername } = useContext(UserContext);
  const { isCartOpen, setCartCount, setCartItems } = useContext(CartContext);
  const { isAdmin, setIsAdmin, searchField, setSearchField } = useContext(AdminContext);
  const { favoriteItems, setFavoriteItems } = useContext(FavoriteContext);

  const [names, setNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const favorites = favoriteItems.length;

  const extractedName = nameExtract(username);

  useEffect(() => {
    const fetchData = async () => {

      const db = getFirestore();
      const collectionsRef = collection(db, 'collections');
      const collectionsSnapshot = await getDocs(collectionsRef);

      const namesArray = [];

      collectionsSnapshot.forEach((doc) => {
        const data = doc.data();
        const items = data.items || [];

        items.forEach((item) => {
          if (item) {
            namesArray.push(item);
          }
        });
      });
      setNames(namesArray);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredNames = names.filter((item) => {
      return item.name.toLowerCase().includes(searchField.toLowerCase());
    });

    setFilteredNames(newFilteredNames);
  }, [names, searchField]);

  let timeout;
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setSearchField(searchFieldString);
    }, 1200);
  };

  const clearSearchField = () => {

    setSearchField('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const setAdminFalse = () => {
    setIsAdmin(false);
  };


  const signOut = () => {
    signOutUser();
    SignInOutToast(username, 'sign out successfully.', "warning", "bottom-left");
    setIsAdmin(false);
    setUsername("");
    setCartCount(0);
    setCartItems([]);
    setFavoriteItems([]);
    navigate('/');
  };

  return (
    <Fragment>
      <div className="navigation">
        {!isAdmin &&
          <Link className="logo-container" to="/" title="go to home" onClick={clearSearchField}>
            <img src={Guitar} alt="" style={{ width: '130px', height: '130px' }} />
          </Link>}
        <div className="title-container">Guitar Shop</div>
        {currentUser && <div className="welcome-container">Welcome {extractedName}</div>}
        <div className="nav-links-container">
          {isAdmin ?
            <>
            <Link className="nav-link" to="/">
                HOME
            </Link>
              <Link className="nav-link" to="/shop">
                  ADMIN PANEL
              </Link>
            </>
            :
            <>
              <Link className="nav-link" to="/" onClick={() => { setAdminFalse(); clearSearchField(); }}>
                HOME
              </Link>
              <Link className="nav-link" to="/shop" onClick={() => { setAdminFalse(); clearSearchField(); }}>
                SHOP
              </Link>
            </>}
          {currentUser ? (
            <>
              {!isAdmin && <Link className="nav-link" to="/favorites" onClick={() => { clearSearchField(); }}>
                FAVORITES
                {favoriteItems.length > 0 && <span className="favorite-count">{favorites}</span>}
              </Link>}
              <span className="nav-link" onClick={() => { signOut(); clearSearchField(); }}>
                SIGN OUT
              </span>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/signin" onClick={clearSearchField}>
                SIGN IN
              </Link>
              <Link className="nav-link" to="/signup" onClick={clearSearchField}>
                SIGN UP
              </Link>
            </>
          )}
          {!isAdmin && currentUser && <CartIcon clearOpen={clearSearchField} />}
        </div>
        {!isAdmin && <span className="search-input">
          <input id="search" type="search" ref={inputRef} onChange={onSearchChange} placeholder="Search guitars: e.g. Fender" />
        </span>}
        {isCartOpen && <CartDropdown />}
      </div>
      {searchField.length > 0 &&
        <>
          <p className="result">Results for {searchField} :</p>
          <div className="filtered-items-container">
            {filteredNames.map((product) => (
              <ul className="filtered-product"><ProductCard key={product.id} product={product}
                showPrice={product.showPrice = false} showBtns={product.showBtns = true} /></ul>
            ))}
          </div>
        </>}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;