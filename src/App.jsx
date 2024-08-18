import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import Loader from './Components/Loader/Loader.jsx';  
import UserContextProvider from './Context/UserContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';

// Lazy load components
const Home = React.lazy(() => import('./Components/Home/Home.jsx'));
const Cart = React.lazy(() => import('./Components/Cart/Cart.jsx'));
const Products = React.lazy(() => import('./Components/Products/Products.jsx'));
const Categories = React.lazy(() => import('./Components/Categories/Categories.jsx'));
const Brands = React.lazy(() => import('./Components/Brands/Brands.jsx'));
const Login = React.lazy(() => import('./Components/Login/Login.jsx'));
const Register = React.lazy(() => import('./Components/Register/Register.jsx'));
const Notfound = React.lazy(() => import('./Components/Notfound/Notfound.jsx'));
const ProductDetails = React.lazy(() => import('./Components/ProductDetails/ProductDetails.jsx'));
const AllOrders = React.lazy(() => import('./Components/AllOrders/AllOrders.jsx'));
const CheckOut = React.lazy(() => import('./Components/CheckOut/CheckOut.jsx'));
const Wishlist = React.lazy(() => import('./Components/Wishlist/Wishlist.jsx'));
const PasswordReset = React.lazy(() => import('./Components/PasswordReset/PasswordReset.jsx'));

const routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Suspense fallback={<Loader />}><Home /></Suspense></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Suspense fallback={<Loader />}><Cart /></Suspense></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><Suspense fallback={<Loader />}><ProductDetails /></Suspense></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Suspense fallback={<Loader />}><Categories /></Suspense></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Suspense fallback={<Loader />}><AllOrders /></Suspense></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Suspense fallback={<Loader />}><CheckOut /></Suspense></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Suspense fallback={<Loader />}><Wishlist /></Suspense></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Suspense fallback={<Loader />}><Brands /></Suspense></ProtectedRoute> },
      { path: 'login', element: <Suspense fallback={<Loader />}><Login /></Suspense> },
      { path: 'register', element: <Suspense fallback={<Loader />}><Register /></Suspense> },
      { path: 'password-reset', element: <Suspense fallback={<Loader />}><PasswordReset /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loader />}><Notfound /></Suspense> },
    ]
  }
]);

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
