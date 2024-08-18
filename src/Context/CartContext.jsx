import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null);

    const getHeaders = () => {
        return {
            token: localStorage.getItem('userToken'),
        };
    };

    const addProductToCart = async (productId) => {
        try {
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { productId },
                {
                    headers: getHeaders(),
                }
            );
            console.log(data);
            setCart(data);
            toast.success(data.message);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error(data.message);
        }
    };

    const updateProductQuantity = async (productId, count) => {
        try {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {count},
                {
                    headers: getHeaders(),
                }
            );
            console.log(data);
            setCart(data);
            toast.success('Quantity Updated');
        } catch (error) {
            console.error("Error updating product quantity:", error);
        }
    };

    const removeProductFromCart = async (productId) => {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: getHeaders(),
                }
            );
            console.log(data);
            setCart(data);
            toast('Product Removed', {
                icon: '🗑️',
              });
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    const getUserCart = async () => {
        try {
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/cart',
                {
                    headers: getHeaders(),
                }
            );
            console.log(data);
            setCart(data);
            return data;
        } catch (error) {
            console.error("Error fetching user cart:", error);
            return null;
        }
    };

    useEffect(()=>{
        if (cart!=0) {
            getUserCart();
        }
    },[])

    return (
        <CartContext.Provider value={{
            addProductToCart,
            updateProductQuantity,
            removeProductFromCart,
            cart,
            getUserCart,
            setCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}
