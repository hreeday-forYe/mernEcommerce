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
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

// Here we are going to create our routes using the browserRouter and createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}></Route>
      <Route  path='/product/:id' element={<ProductScreen/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


reportWebVitals()
