import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { FaRegTrashCan } from "react-icons/fa6";
import QuantityUpdate from '../QuantityUpdate/QuantityUpdate';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emptyCart from '../../assets/emptyCart.png';
import { IoMdClose } from "react-icons/io";
import formatNumber from '../../utils/formatCurrency';

const CartItems = () => {
    const { removeFromCart, totalCartAmount, cartItems, getTotalCartItems } = useContext(ShopContext);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const totalItems = getTotalCartItems();
    const [showPopup, setShowPopup] = useState(false);

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    useEffect(() => {
        setIsCartEmpty(cartItems.length === 0);
        document.body.style.overflow = showPopup ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [cartItems, showPopup]);

    const handleContinueShopping = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className="bg-[#f9f9f9] text-[#333] pt-4 mt-10 pr-6 flex items-center justify-between px-4 py-2 max-w-screen-2x1 mx-auto container xl:px-28">
                <h1 className="text-xl md:text-2xl font-semibold">YOUR SHOPPING CART ({totalItems} items)</h1>
                <hr/>
            </div>
            {!isCartEmpty ? (
                <div className='mt-10 mx-auto p-4 sm:p-10 md:px-20'>
                    <div className='hidden lg:grid grid-cols-6 items-center gap-[75px] pt-[20px] pr-0 text-[#454545] text-[18px] font-semibold '>
                        <p>Products</p>
                        <p></p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Edit</p>
                    </div>
                    <hr className='h-[3px], bg-[#e2e2e2] border mt-5' />

                    {cartItems.map((item) => {
                        const product = item.ProductDetail;
                        const totalPrice = item.quantity * product.Product.product_price;
                        return (
                            <div key={item.product_id}>
                                <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 items-center gap-[75px] pt-[20px] pr-0 text-[#454545] text-[16px] font-semibold'>
                                    <Link to={`/product/${product.sku_slug}`} onClick={() => window.scrollTo(0, 0)}>
                                        <img src={product.sku_image[0]} alt={product.Product.product_name} className='h-40 w-40 object-contain' />
                                    </Link>

                                    <p className="text-sm sm:text-base md:text-lg">{product.Product.Brand.name} - {product.Product.product_name}</p>
                                    <p lang='vi'>{formatNumber(product.Product.product_price)} đ</p>
                                    <QuantityUpdate id={item.sku_id} />
                                    <p lang='vi'>{formatNumber(totalPrice)}đ</p>
                                    <div className='relative flex items-center'>
                                        <button 
                                            onClick={() => removeFromCart(item.sku_id)} 
                                            className="bg-gradient-to-r from-white to-white transition-all duration-200 text-black py-1 px-4 rounded-full flex items-center gap-3 group"
                                        >
                                            <span className="group-hover:block hidden transition-all duration-200">
                                                Delete
                                            </span>
                                            <FaRegTrashCan className="text-xl text-black drop-shadow-sm cursor-pointer"/>
                                        </button>
                                    </div>
                                </div>
                                <br/><hr/>
                            </div>
                        );
                    })}

                    <div className='max-w-screen-2x1 mx-auto container xl:px-28 px-4 mb-20'>
                        <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                            <div className="flex items-center justify-evenly w-full py-6">
                                <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                                <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">{formatNumber(totalCartAmount )}đ</h6>
                            </div>
                        </div>      
                        <div className="flex items-center flex-col sm:flex-row justify-center gap-20 mt-8">
                            <Link to='/' onClick={() => window.scrollTo(0, 0)} className="rounded-full py-4 w-full max-w-[280px] border border-gray-300 flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                                <button>
                                    <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Back to Shop </span>
                                </button>
                            </Link>
                            <Link to='/checkout' onClick={() => window.scrollTo(0, 0)} className='rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-black font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700'>
                                <button>
                                    Continue to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-center items-center gap-4 pb-20"
                >
                    <div>
                        <img
                            className="w-80 rounded-lg p-4 mx-auto"
                            src={emptyCart}
                            alt="emptyCart"
                        />
                    </div>
                    <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                        <h1 className="font-titleFont text-xl font-bold uppercase">
                            Your Cart feels lonely!
                        </h1>
                        <p className="text-[20px] text-center px-10 -mt-2">
                            Your Shopping cart lives to serve. Give it purpose - fill it with
                            many beautiful clothes and make it happy.
                        </p>
                        <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-600 hover:text-white duration-300 border" onClick={handleContinueShopping}>
                            Continue Shopping
                        </button>
                    </div>
                </motion.div>
            )}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-8 relative">
                        <h2 className="text-2xl font-bold mb-4">Choose a Category</h2>
                        <div className="flex justify-around gap-4">
                            <Link to='/new-arrival' onClick={() => window.scrollTo(0, 0)}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">New Arrival Products</button>
                            </Link>
                            <Link to='/promotion' onClick={() => window.scrollTo(0, 0)}>
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Sale Products</button>
                            </Link>
                            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">All Products</button>
                        </div>
                        <button onClick={handleClosePopup} className="absolute top-0 right-0 m-4 bg-red-500 h-5 w-5 flex items-center justify-center "><IoMdClose className='text-[#ffff]' /></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartItems;
