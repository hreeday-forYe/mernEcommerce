import React from 'react';
import ReactDOM from 'react-dom/client';
// import "bootstrap/dist/css/bootstrap.min.css"; // default css file of bootstrap
import "./assets/styles/bootstrap.custom.css"; //custom css file of bootstrap
import './assets/styles/index.css' // custom styling using pure css
// React Router imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// importing the store and the provider from the react redux
import { Provider } from 'react-redux';
import store from './store';


import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
// Here we are going to create our routes using the browserRouter and createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}></Route>
      <Route  path='/product/:id' element={<ProductScreen/>}></Route>
      <Route  path='/cart' element={<CartScreen/>}></Route>
      <Route  path='/login' element={<LoginScreen/>}></Route>
      <Route  path='/register' element={<RegisterScreen/>}></Route>

      {/* If we want to setup some private routes set up another routes as created the PrivateRoute  
        Navigates the user to whatever he is trying to go using the outlet else to login screen as we know ShippingScreen is the page we don't want the user to view unless he is logged in 
      */}
      <Route path='' element={<PrivateRoute/>}>
        <Route  path='/shipping' element={<ShippingScreen/>}></Route>
        <Route  path='/payment' element={<PaymentScreen/>}></Route>
        <Route  path='/placeorder' element={<PlaceOrderScreen/>}></Route>
        <Route  path='/order/:id' element={<OrderScreen/>}></Route>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


reportWebVitals()
