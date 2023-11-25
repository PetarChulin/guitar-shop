import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ConfirmModal from "../confirm-modal/confirm-modal";

import setBackgroundImage from "../../utils/background/changeBackgroundImage";
import { default as Img } from "../../assets/guitar3.jpg";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { AdminContext } from "../../contexts/admin.context";
import { CartContext } from "../../contexts/cart.context";

import SignInOutToast from "./sign-in-out.toast";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { setIsAdmin } = useContext(AdminContext);
  const { cartItems } = useContext(CartContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    setBackgroundImage(Img);
  }, []);

  const navigate = useNavigate();

  const adminCheck = () => {
    if (email === "admin@abv.bg") {
      setIsAdmin(true);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate('/shop');

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password, cartItems);
      resetFormFields();
      SignInOutToast(email, 'signed in successfully.', "success", "bottom-left");
      navigate('/shop');


    } catch (error) {
      let errorText = error.toString().split('/')[1].replace(/[^a-zA-Z ]/g, " ").toUpperCase();
      ConfirmModal("User sign in failed", errorText);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container-sign-in">
          <Button type="submit" buttonType="neon" onClick={adminCheck}>Sign In</Button>
          <Button buttonType="neon" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
      <div className='sign-up'>
        Don't have an account?  <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
};

export default SignInForm;
