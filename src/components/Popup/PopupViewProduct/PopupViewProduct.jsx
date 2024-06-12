import React, { useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import PropTypes from "prop-types";
import axios from "axios";
import "./PopupViewProduct.css";
import formatNumber from "../../../utils/formatCurrency";

const PopupViewProduct = ({ setIsOpenPopup, orderId }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const token = localStorage.getItem("auth-token");
      try {
        const response = await axios.get(
          `https://api.yourrlove.com/v1/web/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          setOrderData(response.data.metadata);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();

    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [orderId]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const { order, orderDetails } = orderData;
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      onClick={() => {
        setIsOpenPopup(false);
      }}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.1)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          padding: "15px 8px",
          animation: "dropTop .3s linear",
          height: "450px",
          width: "900px",
        }}
        className="py-12 px-3 md:px-4 2xl:px-16 2xl:mx-auto lg:overflow-auto"
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "8px" }}
          className="flex justify-start item-start space-y-1 flex-col"
        >
          <h1 className="text-2xl dark:text-white lg:text-3xl font-semibold leading-6 lg:leading-8 text-gray-800">
            Order #{order.order_id.slice(0, 7)}
          </h1>
          <p className="text-sm dark:text-gray-300 font-medium leading-5 text-gray-600">
            {formatDate(order.createdAt)}
          </p>
          <div
            onClick={() => setIsOpenPopup(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <AiOutlineCloseSquare className="h-8 w-8 text-red-500" />
          </div>
        </div>
        {/* Body */}
        <div className="mt-8 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-6 space-y-3 md:space-y-4 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-3 md:space-y-4 xl:space-y-6">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-3 py-3 md:py-4 md:p-4 xl:p-6 w-full">
              <p className="text-md md:text-lg font-semibold leading-5 xl:leading-4 text-gray-800">
                Ordered product
              </p>
              {orderDetails.map((detail) => (
                <div
                  key={detail.sku_id}
                  className="mt-3 md:mt-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-4 xl:space-x-6 w-full"
                >
                  <div className="pb-3 md:pb-6 w-full md:w-32">
                    <img
                      className="w-full hidden md:block"
                      src={detail.ProductDetail?.sku_image[0]}
                      alt={detail.ProductDetail?.Product?.product_name}
                    />
                    <img
                      className="w-full md:hidden"
                      src={detail.ProductDetail?.sku_image[0]}
                      alt={detail.ProductDetail?.Product?.product_name}
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-6 space-y-3 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-6">
                      <h3 className="text-md xl:text-md font-semibold leading-5 text-gray-800">
                        {detail.ProductDetail?.Product?.product_name}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-1">
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-500">Brand: </span>{" "}
                          {detail.ProductDetail?.Product?.Brand?.name}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-500">Color: </span>{" "}
                          {detail.ProductDetail?.sku_color}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-500">Size: </span>{" "}
                          {detail.ProductDetail?.sku_size}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-6 items-start w-full">
                      <p className="text-sm xl:text-md leading-5">
                        {formatNumber(detail.order_detail_price)} đ
                      </p>
                      <p className="text-sm xl:text-md leading-5 text-gray-800">
                        Qty: {detail.order_detail_quantity}
                      </p>
                      <p className="text-sm xl:text-md font-semibold leading-5 text-gray-800">
                        {formatNumber(
                          detail.order_detail_price *
                            detail.order_detail_quantity
                        )}{" "}
                        đ
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-3 md:space-y-0 md:space-x-4 xl:space-x-6">
              <div className="flex flex-col px-3 py-4 md:p-4 xl:p-6 w-full bg-gray-50 space-y-4">
                <h3 className="text-lg font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-3 flex-col border-gray-200 border-b pb-3">
                  <div className="flex justify-between w-full">
                    <p className="text-sm leading-4 text-gray-800">Subtotal</p>
                    <p className="text-sm leading-4 text-gray-600">
                      {formatNumber(order.order_total_price)} đ
                    </p>
                  </div>
                  {order.order_discount_amount > 0 && (
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm leading-4 text-gray-800">
                        Discount{" "}
                        <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">
                          {order.Discount.discount_desc}
                        </span>
                      </p>
                      <p className="text-sm leading-4 text-gray-600">
                        {" "}
                        -{formatNumber(order.order_discount_amount)}đ ({" "}
                        {order.Discount.discount_value}%)
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm leading-4 text-gray-800">Shipping</p>
                    <p className="text-sm leading-4 text-gray-600">
                      {formatNumber(order.order_shipping_price)} đ
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-sm font-semibold leading-4 text-gray-600">
                    {formatNumber(order.order_final_price)} đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer style={{ borderTop: "1px solid lightgray", paddingTop: "8px" }}>
          <div className="bg-gray-50 w-full flex justify-between items-center md:items-start px-3 py-4 md:p-4 xl:p-6 flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2">
              <h3 className="text-lg font-semibold leading-5 text-gray-800">
                Order Information
              </h3>
              <div className="flex flex-col justify-start items-start">
                <div className="flex justify-center w-full md:justify-start items-center space-x-3 py-6 border-b border-gray-200">
                  <div className="flex justify-start items-start flex-col space-y-1">
                    <p className="text-sm font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p className="w-40 lg:w-full xl:w-40 text-center md:text-left text-xs leading-5 text-gray-600">
                      {order.order_street}, {order.order_ward},{" "}
                      {order.order_district}, {order.order_province_city}
                    </p>
                    <p className="text-sm font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Method
                    </p>
                    <p className="w-40 lg:w-full xl:w-40 text-center md:text-left text-xs leading-5 text-gray-600">
                      Standard Shipping
                    </p>
                    <p className="text-sm font-semibold leading-4 text-center md:text-left text-gray-800">
                      Payment Method
                    </p>
                    <p className="w-40 lg:w-full xl:w-40 text-center md:text-left text-xs leading-5 text-gray-600">
                      {order.order_payment_method}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

PopupViewProduct.propTypes = {
  setIsOpenPopup: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default PopupViewProduct;
