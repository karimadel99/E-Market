import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Register() {

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState(null);
  let {setUserData}=useContext(userContext);
  let { cart,setCart } = useContext(CartContext);


  async function register(values) {
    setLoading(true);
    console.log(values);

    try {

      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(data);
      localStorage.setItem('userToken',data.token);
      navigate('/');
      setLoading(false);
      setUserData(data.token);
      setCart(0);
    }
    catch (error) {
      console.log(error.response.data.message);
      setApiError(error.response.data.message)
      setLoading(false)

    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Min length is 3')
      .max(10, 'Max length is 10')
      .required('User name is required'),


    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),


    password: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, 'Example: Karim123')
      .required('Password is required'),


    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('RePassword is required'),


    phone: Yup.string()
      .matches(/^(002|\+2)?01[0125][0-9]{8}$/, 'Must be an Egyptian number')
      .required('Phone is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="w-3/4 md:w-1/2 mx-auto p-20">
      <h1 className="text-3xl my-5 text-center">Register</h1>
      {apiError && <div
        className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">{apiError}</span>
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="relative  z-0 w-full  my-8 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block py-3 dark:text-white  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div
            className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        )}

        <div className="relative  z-0 w-full my-8 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block py-3 dark:text-white px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}

        <div className="relative  z-0 w-full my-8 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block py-3 dark:text-white px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}

        <div className="relative  z-0 w-full my-8 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block py-3 dark:text-white px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Re-enter your Password
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        )}

        <div className="relative  z-0 w-full my-8 group">
          <input
            type="text"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="block py-3 dark:text-white px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-6"
          >
            Enter your Phone Number
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4  my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        )}

        {
          loading ?
          <button
            type="button"
            disabled={!(formik.isValid && formik.dirty)}
            className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center "
          >
            <i className='fas fa-spinner fa-spin-pulse'></i>
          </button>
   :         
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >          Submit
          </button>
        }



      </form>
    </div>
  );
}
