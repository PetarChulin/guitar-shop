import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import InputFormAddItem from './components/add-item-form/form-input-add-item';
import SignInForm from './components/sign-in-form/sign-in-form.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import Button from './components/button/button.component';

const App = () => {

  const [showBtn, setShowBtn] = useState(null);

  useEffect(() => {

    const handleScrollBtn = () => {
      window.scrollY > 300 ? setShowBtn(true) : setShowBtn(false);
    }
    window.addEventListener('scroll', handleScrollBtn);

    return () => {
      window.removeEventListener('scroll', handleScrollBtn);
    };

  }, [])

  return (
    <>
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='signin' element={<SignInForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='admin/*' element={<Shop />} />
        <Route path='add-item-input-form' element={<InputFormAddItem />} />
      </Route>
    </Routes>
    {showBtn &&
      <Button buttonType='neon' className='scroll-to-top-btn'
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Top</Button>
    }
    </>
  );
};

export default App;
