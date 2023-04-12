
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import Navigation from "./routes/navigation/navigation-component";
import Home from "./routes/home/home-component";
import Shop from "./routes/shop/shop-component";
import Auth from "./routes/auth/auth.component";
import Checkout from "./routes/checkout/checkout.component";

import { checkUserSession } from './store/user/user.action';

const App = ()=>{

    const dispatch = useDispatch();

      useEffect(() => {
          dispatch(checkUserSession());
      },[dispatch]);

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
