import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { Pagination, Autoplay } from 'swiper/modules'; 

export default function CategorySwiper() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20} 
      speed={2000} 
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false,
      }}
      breakpoints={{
        340: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <div className="category-slide my-4 rounded-lg w-2/3 mx-auto md:w-full  shadow-lg text-center p-4 bg-white dark:bg-gray-800">
            <img
              src={category.image}
              alt={category.name}
              className="w-4/5 mx-auto h-48 object-fit rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {category.name}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
