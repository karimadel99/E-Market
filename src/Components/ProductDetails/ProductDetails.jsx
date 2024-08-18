import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let { id } = useParams();
  let { addProductToCart } = useContext(CartContext)


  let [product, setProduct] = useState(null);
  let [relatedProducts, setRelatedProducts] = useState([]);

  async function getSpecificProduct(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
      console.log(data.data);
      getRelatedProducts(data.data.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpecificProduct(id);
  }, [id]);

  return (
    <>
      {product ? (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-4">
            <div className="w-3/5 flex mx-auto">
              {
                product.images.length > 1 ?
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    pagination={{
                      clickable: true,
                      type: 'bullets',
                    }}
                    autoplay={{
                      delay: 3000, 
                      disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper> :
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="object-cover"
                  />
              }
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4 dark:text-white">{product.description}</p>
              <p className="text-2xl font-semibold text-indigo-600 mb-4">{product.price}EGP</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 mr-2">
                  {'★'.repeat(Math.round(product.ratingsAverage)) + '☆'.repeat(5 - Math.round(product.ratingsAverage))}
                </span>
                <span className="text-gray-600 dark:text-white">({product.ratingsAverage} average rating)</span>
              </div>
              <button onClick={() => { addProductToCart(product.id) }} className="btn bg-indigo-500 hover:bg-indigo-900 transition duration-200 text-white py-3 px-1 w-full rounded-md mt-2">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <SwiperSlide key={relatedProduct._id}>
                  <Link to={`/productdetails/${relatedProduct._id}`}>
                    <div className=" text-center rounded-lg shadow-sm my-4">
                      <img
                        src={relatedProduct.imageCover}
                        alt={relatedProduct.title}
                        className="w-3/4 mx-auto object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-medium">{relatedProduct.title.split(' ').slice(0, 7).join(' ')}</h3>
                      <p className="text-indigo-600 font-semibold">${relatedProduct.price}</p>
                      <div className="text-yellow-500 mt-2">
                        {'★'.repeat(Math.round(relatedProduct.ratingsAverage)) + '☆'.repeat(5 - Math.round(relatedProduct.ratingsAverage))}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
