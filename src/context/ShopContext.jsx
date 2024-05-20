import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ShopContext = createContext(null);

const getInitialCart = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const ShopContextProvider = ({ children }) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getInitialCart());
    const [cartId, setCartId] = useState(localStorage.getItem('cartId') || null);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountDesc, setDiscountDesc] = useState('');
    const [finalTotalAmount, setFinalTotalAmount] = useState(totalCartAmount);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api.yourrlove.com/v1/web/products');
                setAll_Product(response.data.metadata);
                console.log(response.data.metadata);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    const fetchCartItems = useCallback(async () => {
        try {
            const response = await axios.get(`https://api.yourrlove.com/v1/web/cart/${cartId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
            });
            setCartItems(response.data.metadata);
            console.log(response.data.metadata);
        } catch (error) {
            console.error('Failed to fetch cart items', error);
        }
    }, [cartId]);

    useEffect(() => {
        if (cartId) {
            fetchCartItems();
        }
    }, [cartId, fetchCartItems]);

    useEffect(() => {
        // Update local storage when cartItems changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (itemId, quantity) => {
        const product = all_product.find(p => p.product_id === itemId);
        if (!product) return;

        try {
            const response = await axios.post('https://api.yourrlove.com/v1/web/cart/add_to_cart', {
                sku_id: product.sku_id,
                product_id: itemId,
                quantity,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                }
            });

            console.log(response.data);
            if (!cartId) {
                setCartId(response.data.metadata.cart_id);
                localStorage.setItem('cartId', response.data.metadata.cart_id);
            }

            setCartItems(prevCartItems => {
                const itemIndex = prevCartItems.findIndex(item => item.product_id === itemId);
                if (itemIndex !== -1) {
                    prevCartItems[itemIndex].quantity += quantity;
                } else {
                    prevCartItems.push({
                        ...response.data.metadata,
                        ProductDetail: product
                    });
                }
                return [...prevCartItems];
            });
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    const removeFromCart = async (sku_id) => {
        try {
            const response = await axios.delete(`https://api.yourrlove.com/v1/web/cart/${cartId}/cartitem/${sku_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`
                },
                param: {
                    productdetailId: sku_id,
                    cartId: cartId
                }
            });
            console.log(response.data);

            // Update cart state based on response
            setCartItems(prevCartItems => {
                const newCartItems = prevCartItems.filter(item => item.sku_id !== sku_id);
                localStorage.setItem('cart', JSON.stringify(newCartItems));
                return newCartItems;
            });
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    const fetchTotalCartAmount = useCallback(async () => {
        try {
            const response = await axios.post(`https://api.yourrlove.com/v1/web/cart/${cartId}/checkout`, {
                cart_items: cartItems.map(item => ({
                    sku_id: item.sku_id,
                    quantity: item.quantity
                })),
                discount_code: discountCode || null
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
                },
                param: {
                    cart_id: cartId
                }
            });

            if (response.data.metadata.discount_amount) {
                setDiscountAmount(response.data.metadata.discount_amount);
                setDiscountDesc(response.data.metadata.discount_desc);
                setFinalTotalAmount(response.data.metadata.final_price);
            } else {
                setDiscountAmount(0);
                setDiscountDesc('');
                setFinalTotalAmount(response.data.metadata.total_price);
            }

            setTotalCartAmount(response.data.metadata.total_price);
        } catch (error) {
            console.error('Failed to fetch total cart amount', error);
        }
    }, [cartItems, cartId, discountCode]);

    useEffect(() => {
        fetchTotalCartAmount();
    }, [cartItems, fetchTotalCartAmount]);

    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const contextValue = {
        getTotalCartItems,
        totalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        fetchTotalCartAmount,
        setDiscountCode,
        discountCode,
        discountAmount,
        discountDesc,
        finalTotalAmount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShopContextProvider;
