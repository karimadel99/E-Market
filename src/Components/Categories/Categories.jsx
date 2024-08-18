import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Categories.module.css';
import Loader from '../Loader/Loader';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="my-8 text-5xl font-bold text-center text-indigo-900 dark:text-white">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-10 gap-5 my-10 py-10">
        {categories.map(category => (
          <div key={category._id} className="relative group">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <h2 className="text-white text-lg font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
