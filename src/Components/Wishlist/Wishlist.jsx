import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const token = localStorage.getItem('userToken'); 

  async function fetchWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token,
        },
      });
      setWishlist(data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
     let response= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token,
        },
      });
      fetchWishlist(); 
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  useEffect(() => {
    fetchWishlist(); 
  }, []);

  return (
    <>
      <h1 className="text-5xl dark:text-white  my-15 text-center py-10 text-indigo-800 font-bold">My Wishlist</h1>

      <div className="w-8/12 mx-auto  overflow-x-auto shadow-md my-7 sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-800 dark:text-white text-gray-500">
          <thead className="text-xs text-gray-700 uppercase dark:bg-slate-800 dark:text-white bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!wishlist ? (
              <tr>
                <td colSpan="4">
                  <Loader />
                </td>
              </tr>
            ) : wishlist?.length > 0 ? (
              wishlist.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-slate-700 dark:text-white hover:bg-gray-50">
                  <Link to={`/productdetails/${product.id}`}>
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.title}
                    />
                  </td>
                  </Link>
                  
                  <td className="py-4 dark:text-white font-semibold text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 dark:text-white font-semibold text-gray-900">
                    EGP {product.price}
                  </td>
                  <td className="px-6 py-4 dark:text-white ">
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="font-medium text-red-600 my-2 hover:bg-red-600 hover:text-white rounded p-2 text-center"
                    ><i className="fa-regular fa-heart mx-4"></i> 
                         <p>Remove</p>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='py-10'>
                <td colSpan="4" className="text-center py-40 text-3xl text-red-500 font-bold">
                  Your wishlist is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
