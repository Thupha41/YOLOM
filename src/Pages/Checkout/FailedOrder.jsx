import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import failurePicture from "../../assets/order_fail.jpg";
import axios from "axios";

const FailedOrder = () => {
  // Navigate
  const navigate = useNavigate();
  const handleNavigateToOrderHistory = () => {
    window.scrollTo(0, 0);
    navigate("/account", { state: { activeSection: "orderHistory" } });
    window.location.reload();
  };

  useEffect(() => {
    // Extract parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const orderCode = queryParams.get("orderCode");

    const sendFailedOrderDetails = async () => {
      try {
        await axios.post(
          "https://api.yourrlove.com/v1/web/payment/handle-result",
          {
            id: id,
            orderCode: orderCode,
          }
        );
        console.log("Failed order details sent successfully.");
      } catch (error) {
        console.error("Failed to send order details", error);
      }
    };

    sendFailedOrderDetails();
  }, []);

  return (
    <>
      <div>
        {/* Content */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
          <div className="text-center mb-4">
            <img
              src={failurePicture}
              alt="Failed Payment"
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold">Payment failed</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl md:mx-auto dark:text-gray-400">
              Unfortunately, your payment could not be processed. Please try
              again!
            </p>
          </div>
          <div className="w-full max-w-sm">
            <div className="p-4">
              <button
                className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
                onClick={handleNavigateToOrderHistory}
              >
                Check my order
              </button>
              <Link to="/">
                <button
                  className="w-full mt-5 bg-black text-white hover:bg-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
                  type="submit"
                >
                  Back to home page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FailedOrder;
