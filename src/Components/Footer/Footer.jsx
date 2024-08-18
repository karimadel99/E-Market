import React, { useState } from 'react'
import style from './Footer.module.css'
import logo from '../../assets/images/new2.png';
import google from '../../assets/images/google.png';
import store from '../../assets/images/store.png';


export default function Footer() {



    
  return <>
    
    <footer className=" bg-gray-100 py-8 bottom-0 dark:bg-slate-800 shadow-black shadow-lg dark:shadow-white dark:text-white relative inset-x-0">
      <div className="container w-11/12 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between  space-y-4 md:space-y-0">
          <div className="w-full md:w-2/3 m-3 ">
          <img src={logo} alt="" className='my-4 w-1/5' />
            <h2 className="text-lg font-semibold mb-2">Get the FreshCart app</h2>
            <p className="text-gray-600 dark:text-white mb-4">
              We will send you a link, open it on your phone to download the app.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email..."
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition">
                Share App Link
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center space-y-4 md:space-y-0   md:justify-end">
          <ul className="flex space-x-2 justify-center text-black dark:text-white md:space-x-4 text-2xl my-6 cursor-pointer md:mt-0">
            <li><i className="fab fa-linkedin-in hover:text-white hover:bg-indigo-700 p-3 rounded-full"></i></li>
            <li><i className="fab fa-youtube hover:text-white hover:bg-red-600 p-3 rounded-full"></i></li>
            <li><i className="fab fa-twitter hover:text-white hover:bg-indigo-400 p-3 rounded-full"></i></li>
            <li><i className="fab fa-facebook-f hover:text-white hover:bg-indigo-600 p-3 rounded-full"></i></li>
          </ul>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="app-store-link">
                <img src={store} alt="App Store" className="h-10" />
              </a>
              <a href="play-store-link">
                <img src={google} alt="Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  </>
}
