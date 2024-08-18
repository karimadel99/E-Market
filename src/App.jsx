import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import PasswordReset from './Components/PasswordReset/PasswordReset.jsx'; // Import the PasswordReset component

const routers = createBrowserRouter([
  {
    path: '', 
    element: <Layout />, 
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'password-reset', element: <PasswordReset /> }, 
      { path: '*', element: <Notfound /> },
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
