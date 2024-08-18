import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import CategorySwiper from '../CategorySwiper/CategorySwiper';
import { CartContext } from '../../Context/CartContext';
import './Home.module.css'; // Assuming this is the CSS module for Home
import toast from 'react-hot-toast';

export default function Home() {
  const { addProductToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    getRecentProducts();
    fetchWishlist();
  }, []);

  async function getRecentProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken },
      });
      setWishlist(data.data.map(item => item._id));
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleWishlist(productId) {
    const inWishlist = wishlist.includes(productId);
    try {
      if (inWishlist) {
        let response = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            headers: { token: userToken },
          }
        );
        setWishlist(wishlist.filter(id => id !== productId));
        toast.success(response.data.message);
      } else {
        let response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/wishlist',
          { productId },
          { headers: { token: userToken } }
        );
        setWishlist([...wishlist, productId]);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {products.length > 0 ? (
        <>
          <h2 className="my-5 text-5xl ms-4 text-indigo-800 dark:text-indigo-400 font-bold">Categories</h2>
          <CategorySwiper />
          <div className="flex flex-wrap gap-x-1  mx-auto my-7">
            {products.map(product => (
              <div
                className="product sm:w-3/5 sm:mx-auto md:w-1/3 lg:w-1/5 px-4 py-2 my-3 hover:border-indigo-400 hover:border-2 rounded-md hover:scale-105 transition duration-500 relative dark:bg-slate-900 dark:border-gray-700"
                key={product.id}
              >
                <Link to={`productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="product-image h-70 rounded-md mb-2"
                  />
                  <h2 className="text-indigo-500 dark:text-indigo-300 my-2 text-sm font-semibold">
                    {product.category.name}
                  </h2>
                  <h2 className="text-base font-semibold dark:text-gray-200">
                    {product.title.split(' ').slice(0, 3).join(' ')}
                  </h2>
                  <div className="flex justify-between p-1">
                    <p className="text-sm font-bold dark:text-gray-300">EGP{product.price}</p>
                    <p className=" font-bold dark:text-gray-300">
                      <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="btn bg-indigo-500 dark:bg-indigo-600 text-white py-3 px-1 w-full rounded-md mt-2"
                >
                  Add to Cart
                </button>
                <div
                  onClick={() => toggleWishlist(product.id)}
                  className={`heart-icon absolute top-[6%] right-6 wishlist bg-indigo-300 dark:bg-gray-700 text-xl rounded-full p-2 cursor-pointer transition ${
                    wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400 dark:text-gray-300'
                  }`}
                >
                  <i className="fas fa-heart"></i>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
