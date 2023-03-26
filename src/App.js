
import { useEffect } from 'react';

import { Route, Routes } from "react-router-dom";

import { useDispatch } from 'react-redux';

import Home from "./routes/home/home-component";
import Navigation from "./routes/navigation/navigation-component";
import Auth from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop-component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from './store/user/user.action';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./routes/utils/firebase/firebase.utils";


const App = ()=>{

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
            createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));
          
        });
       
        return unsubscribe;
      }, [dispatch]);

  return (
          <Routes>
              <Route path="/" element={<Navigation/>}>
                  <Route index element={<Home/>}></Route>
                  <Route path="shop/*" element={<Shop/>}></Route>
                  <Route path="auth" element={<Auth/>}></Route>
                  <Route path='checkout' element={<Checkout />} />
              </Route>
          </Routes>
          );
}

export default App;
