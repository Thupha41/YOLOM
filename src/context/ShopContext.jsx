import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const ShopContext = createContext(null);

const getInitialCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const getInitialDiscountCode = () => {
  return localStorage.getItem("discountCode") || "";
};

const getInitialDiscountAmount = () => {
  return parseFloat(localStorage.getItem("discountAmount")) || 0;
};

const getInitialFinalTotalAmount = () => {
  return parseFloat(localStorage.getItem("finalTotalAmount")) || 0;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getInitialCart());
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState(getInitialDiscountCode());
  const [discountAmount, setDiscountAmount] = useState(
    getInitialDiscountAmount()
  );
  const [finalTotalAmount, setFinalTotalAmount] = useState(
    getInitialFinalTotalAmount()
  );
  const [shippingPrice, setShippingPrice] = useState(0);
  const [orderStreet, setOrderStreet] = useState("");
  const [orderProvince, setOrderProvince] = useState("");
  const [orderDistrict, setOrderDistrict] = useState("");
  const [orderWard, setOrderWard] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderName, setOrderName] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.yourrlove.com/v1/web/products"
        );
        setAll_Product(response.data.metadata);
        console.log(response.data.metadata);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.yourrlove.com/v1/web/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      );
      setCartItems(response.data.metadata);
      console.log(response.data.metadata);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  }, [cartId]);

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId, fetchCartItems]);

  useEffect(() => {
    // Update local storage when cartItems changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId, quantity) => {
    const product = all_product.find((p) => p.product_id === itemId);
    if (!product) return;

    try {
      const response = await axios.post(
        "https://api.yourrlove.com/v1/web/cart/add_to_cart",
        {
          sku_id: product.sku_id,
          product_id: itemId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      );

      console.log(response.data);
      if (!cartId) {
        setCartId(response.data.metadata.cart_id);
        localStorage.setItem("cartId", response.data.metadata.cart_id);
      }

      setCartItems((prevCartItems) => {
        const itemIndex = prevCartItems.findIndex(
          (item) => item.product_id === itemId
        );
        if (itemIndex !== -1) {
          prevCartItems[itemIndex].quantity += quantity;
        } else {
          prevCartItems.push({
            ...response.data.metadata,
            ProductDetail: product,
          });
        }
        return [...prevCartItems];
      });
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (sku_id) => {
    try {
      const response = await axios.delete(
        `https://api.yourrlove.com/v1/web/cart/${cartId}/cartitem/${sku_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
          param: {
            productdetailId: sku_id,
            cartId: cartId,
          },
        }
      );
      console.log(response.data);

      // Update cart state based on response
      setCartItems((prevCartItems) => {
        const newCartItems = prevCartItems.filter(
          (item) => item.sku_id !== sku_id
        );
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        return newCartItems;
      });
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const fetchTotalCartAmount = useCallback(
    async (discountCode = "") => {
      try {
        const checkoutData = JSON.parse(localStorage.getItem("checkout-data"));
        const response = await axios.post(
          `https://api.yourrlove.com/v1/web/orders/checkout`,
          {
            cart_id: cartId,
            cart_items: cartItems.map((item) => ({
              sku_id: item.sku_id,
              quantity: item.quantity,
              price: item.ProductDetail.Product.product_price,
            })),
            discount_code: discountCode,
            delivery_information: {
              personal_detail: {
                first_name:
                  checkoutData.shippingAddressFormData.first_name || "",
                last_name: checkoutData.shippingAddressFormData.last_name || "",
                email: checkoutData.shippingAddressFormData.email_field || "",
                phone_number: checkoutData.shippingAddressFormData.phone || "",
              },
              shipping_address: {
                province_city: checkoutData.shippingAddressFormData.city || "",
                district: checkoutData.shippingAddressFormData.district || "",
                ward: checkoutData.shippingAddressFormData.ward || "",
                street: checkoutData.shippingAddressFormData.address || "",
              },
            },
            payment_method: selectedPaymentMethod === "cod" ? "Cash" : "momo",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            },
          }
        );

        const data = response.data.metadata;
        setTotalCartAmount(data.total_price);
        setDiscountAmount(data.discount_amount || 0);
        setFinalTotalAmount(data.final_price || data.total_price);
        setShippingPrice(data.shipping_price || 0);
        setOrderStreet(data.delivery_information.shipping_address.street || "");
        setOrderDistrict(
          data.delivery_information.shipping_address.district || ""
        );
        setOrderProvince(
          data.delivery_information.shipping_address.province_city || ""
        );
        setOrderWard(data.delivery_information.shipping_address.ward || "");
        setOrderPhone(
          data.delivery_information.personal_detail.phone_number || ""
        );
        setOrderName(
          `${data.delivery_information.personal_detail.first_name} ${data.delivery_information.personal_detail.last_name}` ||
            ""
        );
        return data;
      } catch (error) {
        console.error("Failed to fetch total cart amount", error);
        throw error;
      }
    },
    [cartItems, cartId, selectedPaymentMethod]
  );

  useEffect(() => {
    fetchTotalCartAmount(discountCode);
  }, [cartItems, fetchTotalCartAmount, discountCode]);

  useEffect(() => {
    localStorage.setItem("discountCode", discountCode);
    localStorage.setItem("discountAmount", discountAmount);
    localStorage.setItem("finalTotalAmount", finalTotalAmount);
    localStorage.setItem("orderProvince", orderProvince);
    localStorage.setItem("orderWard", orderWard);
    localStorage.setItem("orderStreet", orderStreet);
    localStorage.setItem("orderDistrict", orderDistrict);
    localStorage.setItem("orderPhone", orderPhone);
    localStorage.setItem("orderName", orderName);
  }, [
    discountCode,
    discountAmount,
    finalTotalAmount,
    orderDistrict,
    orderProvince,
    orderStreet,
    orderWard,
    orderName,
    orderPhone,
  ]);

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
    finalTotalAmount,
    shippingPrice,
    orderDistrict,
    orderProvince,
    orderStreet,
    orderWard,
    orderName,
    orderPhone,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    cartId,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
