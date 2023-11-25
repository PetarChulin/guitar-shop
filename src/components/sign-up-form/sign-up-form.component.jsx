import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import ConfirmModal from '../confirm-modal/confirm-modal';
import setBackgroundImage from '../../utils/background/changeBackgroundImage';
import { default as Img } from '../../assets/guitar14.jpg';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {

  useEffect(() => {
    setBackgroundImage(Img);
  }, []);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      ConfirmModal('Error, passwords don\'t match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      ConfirmModal(`User ${displayName} successfully created!`, '','', 3000);
      navigate('/shop');
    } catch (error) {
        let errorText = error.toString().split('/')[1].replace(/[^a-zA-Z ]/g, " ").toUpperCase();
        ConfirmModal('Cannot create user' , errorText);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <div className='button-container-sign-up'>
        <Button type='submit' buttonType='neon'>Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
