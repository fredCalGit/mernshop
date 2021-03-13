import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase';
import { currentUser } from './functions/auth';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import Header from './components/nav/Header';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import Product from './pages/Product';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup state
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={AllProducts} />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          component={ProductUpdate}
        />
        <Route path="/product/:slug" exact component={Product} />
      </Switch>
    </>
  );
};

export default App;
