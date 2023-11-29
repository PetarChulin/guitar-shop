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
import Footer from './routes/footer/footer.component';
import ProtectedRoutesAdmin from './routes/protected-routes/admin.routes.component';
import ProtectedRouteLoggedUser from './routes/protected-routes/logged.routes.component';
import Favorites from './components/favotites-component/favorites.component';
import Unathorized from './routes/protected-routes/unauthorized.component';
import NotFound from './routes/protected-routes/not-find.component';
import ProtectedRouteNotLogged from './routes/protected-routes/notlogged.routes.component';

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
          <Route element={<ProtectedRouteLoggedUser />}>
            <Route path='signin' element={<SignInForm />} />
            <Route path='signup' element={<SignUpForm />} />
          </Route>
          <Route element={<ProtectedRouteNotLogged />}>
            <Route path='checkout' element={<Checkout />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>
          <Route element={<ProtectedRoutesAdmin />}>
            <Route path='admin/*' element={<Shop />} />
            <Route path='add-item-input-form' element={<InputFormAddItem />} />
          </Route>
          <Route path='/unauthorized' element={<Unathorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      {showBtn &&
        <Button buttonType='neon' className='scroll-to-top-btn'
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Top</Button>
      }
    </>
  );
};

export default App;
