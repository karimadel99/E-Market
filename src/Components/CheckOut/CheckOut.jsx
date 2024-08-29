import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {

 let{cart}= useContext(CartContext)
 

  let [loading, setLoading] = useState(false);

  let token=localStorage.getItem('userToken')

  async function CheckOut(values) {
    setLoading(true)
    console.log(values);
   let  cartId=cart.data._id;

    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-market-blue.vercel.app`, values,
        {
          headers: {token}
        }
      );
      console.log(data);
      if (data.status=='success') {
        window.location.href=data.session.url
      }
      setLoading(false)
    }
    catch (error) {
      console.log(error.response.data.message);
      setLoading(false)
    }
  }


  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: CheckOut,
  });

  return (
    <div className="w-1/2 mx-auto  my-16 p-10">
      <h1 className="text-3xl my-5 text-center">Check Out</h1>
      <form onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block my-12 py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your details
          </label>
        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block my-12 py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block my-12 py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your city
          </label>
        </div>

        {
          loading ?
          <button
            type="button"
            className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center "
          >
            <i className='fas fa-spinner fa-spin-pulse'></i>
          </button>
      :         
          <button
            type="submit"
            
            className="text-white bg-indigo-500 cursor-pointer hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >          Submit
          </button>
        }
      </form>
    </div>
  );
}
