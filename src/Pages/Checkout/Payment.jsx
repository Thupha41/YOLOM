import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import formatNumber from "../../utils/formatCurrency";
import "./Payment.css";
import axios from "axios";
import vietQr from "../../assets/vietqr-icon-site.png";

const Payment = () => {
  const {
    cartItems,
    totalCartAmount,
    fetchTotalCartAmount,
    setDiscountCode,
    discountAmount,
    finalTotalAmount,
    getTotalCartItems,
    shippingPrice,
    orderDistrict,
    orderProvince,
    orderStreet,
    orderWard,
    orderName,
    orderPhone,
    cartId,
    loading,
  } = useContext(ShopContext);

  const totalItems = getTotalCartItems();
  const [localDiscountCode, setLocalDiscountCode] = useState(
    localStorage.getItem("discountCode") || ""
  );
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(
    !!localStorage.getItem("discountCode")
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  useEffect(() => {
    fetchTotalCartAmount();
  }, [fetchTotalCartAmount]);

  const handleApplyDiscount = async () => {
    setDiscountCode(localDiscountCode);
    try {
      const data = await fetchTotalCartAmount(localDiscountCode);
      if (data.discount_amount > 0) {
        setDiscountError("");
        setDiscountApplied(true);
      } else {
        setDiscountError("Invalid discount code.");
        setDiscountApplied(false);
      }
    } catch (error) {
      setDiscountError("Failed to apply discount code.");
      setDiscountApplied(false);
      console.error("Error applying discount code:", error);
    }
  };

  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setLocalDiscountCode("");
    setDiscountError("");
    setDiscountApplied(false);
    fetchTotalCartAmount();
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmOrder = async () => {
    try {
      const checkoutData = JSON.parse(localStorage.getItem("checkout-data"));
      const response = await axios.post(
        "https://api.yourrlove.com/v1/web/orders",
        {
          cart_id: cartId,
          cart_items: cartItems.map((item) => ({
            sku_id: item.sku_id,
            quantity: item.quantity,
            price: item.ProductDetail.Product.product_price,
          })),
          discount_code: localDiscountCode || null,
          delivery_information: {
            personal_detail: {
              first_name: checkoutData.shippingAddressFormData.firstName || "",
              last_name: checkoutData.shippingAddressFormData.lastName || "",
              email: checkoutData.shippingAddressFormData.email || "",
              phone_number: checkoutData.shippingAddressFormData.phone || "",
            },
            shipping_address: {
              province_city: checkoutData.shippingAddressFormData.city || "",
              district: checkoutData.shippingAddressFormData.district || "",
              ward: checkoutData.shippingAddressFormData.ward || "",
              street: checkoutData.shippingAddressFormData.address || "",
            },
          },
          payment_method:
            selectedPaymentMethod === "cod" ? "Cash" : "Bank Transfer",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      );

      const data = response.data.metadata;

      window.alert("Order created successfully!");
      window.scrollTo(0, 0);

      if (selectedPaymentMethod === "cod") {
        window.location.replace("/checkout/#success");
      } else if (selectedPaymentMethod === "Bank Transfer") {
        const url = new URL(data);
        const queryParams = url.search;
        const baseUrl = url.origin + url.pathname;
        window.location.href = `${baseUrl}#success${queryParams}`;
      }

      console.log("Order created successfully!", data);
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingPrice");
      localStorage.removeItem("discountCode");
      localStorage.removeItem("discountAmount");
      localStorage.removeItem("finalTotalAmount");
    } catch (error) {
      window.alert("Failed to create order.");
      console.error("Failed to create order", error);
      const url = window.location.href;
      const urlObj = new URL(url);
      const queryParams = urlObj.search;
      window.location.replace(
        `${urlObj.origin}${urlObj.pathname}#failure${queryParams}`
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center mb-6">
          <a
            href="/"
            className="pt-16 text-2xl font-semibold text-gray-900 dark:text-white"
            style={{
              fontFamily: "Suranna",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            YOLOM
          </a>
        </div>
        {/* Progress bar */}
        <div className="flex items-start px-4 sm:px-8 md:px-16 lg:px-64 pt-8">
          <div className="w-full">
            <div className="flex items-center w-full">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.location.replace("/checkout/#shipping");
                }}
              >
                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                  <span className="text-base text-white font-bold">1</span>
                </div>
              </button>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4">
              <h6 className="text-base font-bold text-[#333]">Shipping</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4">
              <h6 className="text-base font-bold text-[#333]">Payment</h6>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">3</span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-gray-400">Success</h6>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="font-[sans-serif] mt-4 bg-gray-50 max-w-screen-2x1 mx-auto container xl:px-28 px-4 py-20">
          <div className="max-lg:max-w-xl mx-auto w-full">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left side */}
              <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
                <form className="lg:mt-4">
                  <div className="mt-12">
                    <h2 className="block text-xl font-bold text-gray-700">
                      Payment method
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-8">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="w-5 h-5 cursor-pointer"
                          id="cod"
                          checked={selectedPaymentMethod === "cod"}
                          onChange={() => handlePaymentMethodChange("cod")}
                        />
                        <label
                          htmlFor="cod"
                          className="ml-4 flex gap-2 cursor-pointer"
                        >
                          <span>Cash on Delivery (COD)</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="w-5 h-5 cursor-pointer"
                          id="momo"
                          checked={selectedPaymentMethod === "Bank Transfer"}
                          onChange={() =>
                            handlePaymentMethodChange("Bank Transfer")
                          }
                        />
                        <label
                          htmlFor="momo"
                          className="ml-0 flex gap-4 cursor-pointer"
                        >
                          <img
                            src={vietQr}
                            className="h-10 w-10 mx-4"
                            alt="card1"
                          />
                        </label>
                        <span lang="vi">VietQR</span>
                      </div>
                    </div>
                    <hr className="h-px my-10 bg-gray-300 border-0 dark:bg-gray-700" />
                    {/* Discount Code Section */}
                    <div className="mt-8">
                      <h3
                        htmlFor="discount-code"
                        className="block text-xl font-bold text-gray-700"
                      >
                        Apply Discount Code
                      </h3>
                      <div className="flex mt-2">
                        <input
                          type="text"
                          id="discount-code"
                          value={localDiscountCode}
                          onChange={(e) => setLocalDiscountCode(e.target.value)}
                          disabled={discountApplied || loading}
                          className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 ${
                            discountApplied
                              ? "cursor-not-allowed text-gray-400"
                              : ""
                          }`}
                          placeholder="Input discount code"
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className={`ml-2 px-4 py-2 rounded-md ${
                            discountApplied
                              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <svg
                              aria-hidden="true"
                              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                      {discountApplied && (
                        <div className="mt-2 text-sm text-green-600">
                          Discount Code has been applied. Discount{" "}
                          {formatNumber(discountAmount)}đ.
                          <button
                            type="button"
                            onClick={handleRemoveDiscount}
                            className="text-red-600 hover:underline bounce"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {discountError && (
                        <div className="mt-2 text-red-500 text-sm">
                          {discountError}
                        </div>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="grid gap-6 mt-8">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-3 block text-sm"
                        >
                          I accept the{" "}
                          <a
                            href="/customer-support#terms"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Buttons Confirm Payment */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.replace("/checkout/#shipping");
                      }}
                      type="button"
                      className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 border border-gray-300 text-[#333] rounded-md hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmOrder}
                      type="button"
                      className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          aria-hidden="true"
                          className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        `Confirm ${formatNumber(finalTotalAmount)}đ`
                      )}
                    </button>
                  </div>

                  {/* Information section (Send to and Delivery method) */}
                  <div className="mt-10">
                    <div className="">
                      <h2 className="block text-xl font-bold text-gray-700">
                        Send to:
                      </h2>
                      <div className="space-y-6 mt-4">
                        <div className="bg-gray-200 p-4 rounded-md w-[600px]">
                          <h3 className="text-base font-bold text-[#333]">
                            Delivery Information
                          </h3>
                          <div className="mt-4">
                            <p className="text-sm text-[#333]">
                              Customer&apos;s Name:{" "}
                              {loading ? (
                                <svg
                                  aria-hidden="true"
                                  className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              ) : (
                                <span className="font-semibold">
                                  {orderName}{" "}
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-[#333] mt-2">
                              Telephone:{" "}
                              {loading ? (
                                <svg
                                  aria-hidden="true"
                                  className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              ) : (
                                <span className="font-semibold">
                                  {orderPhone}{" "}
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-[#333] mt-2">
                              Address:{" "}
                              {loading ? (
                                <svg
                                  aria-hidden="true"
                                  className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              ) : (
                                <span className="font-semibold">
                                  {orderStreet}, {orderWard}, {orderDistrict},{" "}
                                  {orderProvince}.{" "}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="block text-xl font-bold text-gray-700 mt-10">
                        Delivery method:
                      </h2>
                      <div className="space-y-6 mt-4">
                        <div className="bg-gray-200 p-4 rounded-md w-40">
                          <p className="text-sm text-[#333]">
                            Standard delivery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right side */}
              <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 ">
                <div className="relative h-full">
                  <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                    <h2 className="text-2xl font-extrabold text-[#150d0d]">
                      Order Summary
                    </h2>
                    <h3 className="text-xl font-bold text-[#150d0d]">
                      {" "}
                      ({totalItems} items)
                    </h3>
                    <div className="space-y-6 mt-10 mb-32 items-center justify-center flex">
                      {loading ? (
                        <svg
                          aria-hidden="true"
                          className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        cartItems.map((item) => {
                          const product = item.ProductDetail;
                          const totalPrice =
                            item.quantity * product.Product.product_price;
                          return (
                            <div
                              key={item.sku_id}
                              className="grid sm:grid-cols-2 items-start gap-6"
                            >
                              <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                                <img
                                  src={product.sku_image[0]}
                                  className="w-full object-contain"
                                  alt={product.Product.product_name}
                                />
                              </div>
                              <div>
                                <h3 className="text-base text-[#333] font-semibold">
                                  {product.Product.product_name}
                                </h3>
                                <ul className="text-xs text-[#333] space-y-2 mt-2">
                                  <li className="flex flex-wrap gap-4">
                                    <span>
                                      SKU:{" "}
                                      <span className="font-regular text-red-700">
                                        {product.sku_no}
                                      </span>
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Brand:{" "}
                                    <span className="ml-auto">
                                      {product.Product.Brand.name}
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Color:{" "}
                                    <span className="ml-auto">
                                      {product.sku_color}
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Size:{" "}
                                    <span className="ml-auto">
                                      {product.sku_size}
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Price:{" "}
                                    <span className="ml-auto">
                                      {formatNumber(
                                        product.Product.product_price
                                      )}
                                      đ
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Quantity:{" "}
                                    <span className="ml-auto">
                                      {item.quantity}
                                    </span>
                                  </li>
                                  <li className="flex flex-wrap gap-4">
                                    Total Price:{" "}
                                    <span className="ml-auto">
                                      {formatNumber(totalPrice)}đ
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="absolute left-0 bottom-0 bg-gray-200 w-full p-4">
                    <h4 className="flex flex-wrap gap-4 text-base mb-2 text-[#333] font-bold">
                      Total{" "}
                      <span className="ml-auto">
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          `${formatNumber(totalCartAmount)} đ`
                        )}
                      </span>
                    </h4>
                    {discountAmount > 0 && (
                      <h4 className="flex flex-wrap gap-4 text-base mb-2 text-[#333] font-bold">
                        Discount{" "}
                        <span className="ml-auto">
                          {loading ? (
                            <svg
                              aria-hidden="true"
                              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          ) : (
                            `${formatNumber(discountAmount)} đ`
                          )}
                        </span>
                      </h4>
                    )}
                    <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                      Shipping Cash{" "}
                      <span className="ml-auto">
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          `${formatNumber(shippingPrice)} đ`
                        )}
                      </span>
                    </h4>
                    <hr className="w-full h-[2px] mx-auto my-4 bg-gray-400 border-0 rounded md:my-4 dark:bg-gray-700" />
                    <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                      Final Total{" "}
                      <span className="ml-auto">
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          `${formatNumber(finalTotalAmount)} đ`
                        )}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
