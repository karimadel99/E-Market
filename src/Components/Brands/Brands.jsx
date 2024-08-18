import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Brands.module.css'; // Adjusted CSS module name
import Loader from '../Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands'); // Adjusted API endpoint
        setBrands(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="my-8 text-5xl font-bold text-center text-indigo-900 dark:text-white">Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 w-10/12 lg:grid-cols-4 mx-auto gap-3 my-10 py-10">
        {brands.map(brand => (
          <div key={brand._id} className="relative group">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <h2 className="text-white text-lg font-semibold">{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
