import { React, Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import { collection, getDocs, getFirestore } from "firebase/firestore";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { AdminContext } from "../../contexts/admin.context";

import { default as Guitar } from "../../assets/guitar-logo.png"
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import SignInOutToast from "../../components/sign-in-form/sign-in-out.toast";
import ProductCard from "../../components/product-card/product-card.component";

const Navigation = () => {
  const { currentUser, username, setUsername } = useContext(UserContext);
  const { isCartOpen, setCartCount, setCartItems } = useContext(CartContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const [names, setNames] = useState([]);
  // const [searched, setSearched] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [searchField, setSearchField] = useState('');


  const navigate = useNavigate();

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

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  // const onEnterText = (e) => {
  //   setSearched(e.target.value.toLocaleLowerCase());
  // };

  // const search = () => {
  //   const newFilteredNames = names.filter((item) => {
  //     return item.name.toLowerCase().includes(searched.toLowerCase());
  //   });
  //   setFilteredNames(newFilteredNames);
  // };

  const clearSearchField = () => {
    setSearchField('');
    console.log('cleared');
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
    navigate('/');
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/" title="go to home" onClick={clearSearchField}>
          <img src={Guitar} alt="" style={{ width: '130px', height: '130px' }} />
        </Link>
        <div className="title-container">Guitar Shop</div>
        {currentUser && <div className="welcome-container">Welcome {username}</div>}
        <div className="nav-links-container">
          {isAdmin ? <Link className="nav-link" to="/admin">
            <span className="nav-link">
              ADMIN
            </span>
          </Link> :
            <Link className="nav-link" to="/shop" onClick={() => { setAdminFalse(); clearSearchField(); }}>
              SHOP
            </Link>}
          {currentUser ? (
            <span className="nav-link" onClick={() => { signOut(); clearSearchField(); }}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/signin" onClick={clearSearchField}>
              SIGN IN
            </Link>
          )}
          <CartIcon clearOpen={clearSearchField} />
        </div>
        <span className="search-input">
          <input type="search" onChange={onSearchChange} placeholder="Search: e.g. Fender" />
          {/* <Button onClick={search}>Search</Button> */}
        </span>
        {isCartOpen && <CartDropdown />}
      </div>
      {searchField.length > 0 && <div className="filtered-items-container">
        <p>Results for {searchField} :</p>
        {filteredNames.map((product) => (
          <ul className="filtered-product"><ProductCard key={product.id} product={product}
            showPrice={product.showPrice = false} showBtns={product.showBtns = false} /></ul>
        ))}
      </div>}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
