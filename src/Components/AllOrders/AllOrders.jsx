import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function AllOrders() {


  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }


  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem('userToken');

      if (token) {
        try {
          const decodedToken = parseJwt(token);
          const userId = decodedToken.id;

          const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setLoading(false);
        }
      } else {
        console.error('No token found');
        setLoading(false); 
      }
    }

    fetchOrders();
  }, []);


  const handleShowMore = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container w-3/4 mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-gray-100 dark:bg-slate-700 p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold">Order # {index + 1}</h2>
              <p><strong>Shipping Address:</strong> {order.shippingAddress?.details || 'Address not provided'}, {order.shippingAddress?.city || ''}</p>
              <p><strong>Phone:</strong> {order.shippingAddress?.phone || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ${order.totalOrderPrice}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
              <button
                onClick={() => handleShowMore(order)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Show More
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white dark:bg-slate-700 rounded p-6 shadow-lg max-w-lg w-full relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-indigo-500 text-4xl hover:text-indigo-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {selectedOrder.cartItems.map((item) => (
              <div key={item._id} className="flex mb-4">
                <Link to={`/productdetails/${item.product._id}`}>
                  <img src={item.product.imageCover} alt={item.product.title} className="w-28 h-28 object-cover rounded mr-4" />
                </Link>
                <div>
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p>Quantity: {item.count}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
