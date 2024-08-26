import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import { Link, NavLink } from 'react-router-dom';

export default function Cart() {
  const { getUserCart, updateProductQuantity, removeProductFromCart, cart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [loadingButtons, setLoadingButtons] = useState({}); // State for individual button loading

  useEffect(() => {
    const fetchCart = async () => {
      await getUserCart();
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleIncreaseQuantity = async (productId, currentQuantity) => {
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: true }));
    await updateProductQuantity(productId, currentQuantity + 1);
    await getUserCart();
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: false }));
  };

  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: true }));
    if (currentQuantity > 1) {
      await updateProductQuantity(productId, currentQuantity - 1);
    } else {
      await removeProductFromCart(productId);
    }
    await getUserCart();
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: false }));
  };

  const handleRemoveProduct = async (productId) => {
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: true }));
    await removeProductFromCart(productId);
    await getUserCart();
    setLoadingButtons((prevState) => ({ ...prevState, [productId]: false }));
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center dark:text-white pt-20">Cart</h1>

      <div className="w-10/12 mb-5 mx-auto my-4 overflow-x-auto dark:bg-gray-800 dark:text-white shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase dark:bg-slate-600 dark:text-gray-50 bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price per 1</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className='dark:bg-gray-800 text-white'>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <Loader />
                </td>
              </tr>
            ) : (cart?.data && cart.data.products.length > 0) ? (
              cart.data.products.map((product) => (
                <tr key={product.product._id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:text-white">
                  <td className="p-4">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.name}
                    />
                  </Link>
                  </td>
                  <td className="py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(product.product._id, product.count)}
                        className={`inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 ${loadingButtons[product.product._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                        disabled={loadingButtons[product.product._id]}
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <span
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-2.5 py-1"
                      >
                        {product.count}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.product._id, product.count)}
                        className={`inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 ${loadingButtons[product.product._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                        disabled={loadingButtons[product.product._id]}
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold dark:text-white text-gray-900">{product.price}EGP</td>
                  <td className="px-6 py-4 font-semibold dark:text-white text-gray-900">{product.price * product.count}EGP</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveProduct(product.product._id)}
                      className={`font-medium text-red-600 my-2 hover:bg-red-600 hover:text-white rounded p-2 ${loadingButtons[product.product._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loadingButtons[product.product._id]}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h3 className="text-5xl text-center text-indigo-900 dark:text-indigo-300 py-10">Cart is empty</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> 
      {cart?.data && cart.data.products.length > 0 && (
        <div>
          <div className="flex w-3/4 mx-auto font-bold text-3xl my-8 text-indigo-700 justify-between">
            <h3>Total price</h3>
            <h3>{cart.data.totalCartPrice} EGP</h3>
          </div>
          <div className="flex justify-center mt-8">
            <NavLink to="/checkout">
              <button className='bg-indigo-500 mb-5 text-white py-2 px-5 mx-auto rounded shadow-sm hover:bg-indigo-900'>
                Check Out
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
