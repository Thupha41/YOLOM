import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import formatNumber from "../../utils/formatCurrency";
import PopupViewProduct from "../../components/Popup/PopupViewProduct/PopupViewProduct";
import ToastNotification from "../../components/Popup/ToastNotification/ToastNotification";
import { ShopContext } from "../../context/ShopContext";
import nodatafound from "../../assets/NoDataFound/notdatafound.webp";
import PopupNotification from "../../components/Popup/PopupNotification/PopupNotification";
const AccountSetting = () => {
  const location = useLocation();
  const username = useUserData();
  const [activeSection, setActiveSection] = useState("accounts");
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [openPopupOrderId, setOpenPopupOrderId] = useState(null);
  const { orderData, setOrderData } = useContext(ShopContext);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryId, setDeliveryId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("activeSection");
    if (section) {
      setActiveSection(section);
    } else if (location.state && location.state.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setProvinces(response.data);

        const savedDeliveryInfo = JSON.parse(
          localStorage.getItem("account-delivery-info")
        );

        if (savedDeliveryInfo) {
          const { province_city, district, ward, street, delivery_id } =
            savedDeliveryInfo;
          setSelectedProvince(province_city);
          setSelectedDistrict(district);
          setSelectedWard(ward);
          setAddress(street);
          setDeliveryId(delivery_id);

          const foundProvince = response.data.find(
            (province) => province.Name === province_city
          );
          if (foundProvince) {
            setDistricts(foundProvince.Districts);
            const foundDistrict = foundProvince.Districts.find(
              (districtItem) => districtItem.Name === district
            );
            if (foundDistrict) {
              setWards(foundDistrict.Wards);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  const updateOrderStatusLocally = (orderId, newStatus) => {
    const updatedOrders = orderData.map((order) =>
      order.order_id === orderId ? { ...order, order_status: newStatus } : order
    );
    setOrderData(updatedOrders);
  };

  // HANDLE CANCEL BUTTON --- UPDATE ORDER
  const handleCancelOrder = async (orderId) => {
    try {
      const responseUpdateOrder = await axios.put(
        `https://api.yourrlove.com/v1/web/orders/${orderId}`,
        {
          status: "Cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        }
      );

      if (responseUpdateOrder.status === 200) {
        updateOrderStatusLocally(orderId, "Cancelled");
        ToastNotification(
          `Cancel Order #${orderId.slice(0, 7)} Successfully`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating status", error);
      ToastNotification("Error cancelling order", "error");
    }
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
    setSelectedDistrict("");
    setSelectedWard("");

    const foundProvince = provinces.find(
      (province) => province.Name === provinceName
    );
    if (foundProvince) {
      setDistricts(foundProvince.Districts);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSelectedWard("");

    const foundDistrict = districts.find(
      (district) => district.Name === districtName
    );
    if (foundDistrict) {
      setWards(foundDistrict.Wards);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (e) => {
    const wardName = e.target.value;
    setSelectedWard(wardName);
  };

  const handleAddressChange = (e) => {
    const streetAddress = e.target.value;
    setAddress(streetAddress);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !address.trim()
    ) {
      ToastNotification("Please fill in all the fields", "error");
      return;
    }

    setIsEditing(false);

    const province = provinces.find(
      (province) => province.Name === selectedProvince
    );
    const district = districts.find(
      (district) => district.Name === selectedDistrict
    );
    const ward = wards.find((ward) => ward.Name === selectedWard);

    const requestBody = {
      province_city: province ? province.Name : "",
      district: district ? district.Name : "",
      ward: ward ? ward.Name : "",
      street: address,
      is_default: true,
    };

    const token = localStorage.getItem("auth-token");
    console.log("Authorization Token:", token);

    try {
      // Set current default address to false if it exists
      if (deliveryId) {
        await axios.put(
          `https://api.yourrlove.com/v1/web/deliveryinfors/${deliveryId}`,
          { is_default: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Save new address and set as default
      const response = await axios.post(
        "https://api.yourrlove.com/v1/web/deliveryinfors",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newDeliveryId = response.data.metadata.delivery_id;
      setDeliveryId(newDeliveryId);
      const savedDeliveryInfo = {
        ...requestBody,
        delivery_id: newDeliveryId,
      };
      localStorage.setItem(
        "account-delivery-info",
        JSON.stringify(savedDeliveryInfo)
      );
      ToastNotification("Address has been saved", "success");
      console.log("Address saved:", response.data);
    } catch (error) {
      console.error("Error saving address:", error);
      ToastNotification("Error saving address", "error");
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto mb-20">
      <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10 lg:overflow-y-auto lg:sticky lg:h-[calc(100vh-60px)]">
        <div className="relative my-4 w-56 sm:hidden">
          <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
          />
          <label
            htmlFor="select-1"
            className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
          >
            Accounts{" "}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              onClick={() => setActiveSection("accounts")}
            >
              Accounts
            </li>
            <li
              className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              onClick={() => setActiveSection("orderHistory")}
            >
              Order History
            </li>
          </ul>
        </div>

        <div className="col-span-2 hidden sm:block">
          <ul>
            <li className="mt-5">
              <button
                onClick={() => setActiveSection("accounts")}
                className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeSection === "accounts"
                    ? "text-blue-700 transition border-l-2  border-l-blue-700"
                    : "border-transparent"
                }`}
              >
                Accounts
              </button>
            </li>
            <li className="mt-5">
              <button
                onClick={() => setActiveSection("orderHistory")}
                className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeSection === "orderHistory"
                    ? "text-blue-700 transition border-l-2  border-l-blue-700"
                    : "border-transparent"
                }`}
              >
                Order History
              </button>
            </li>
          </ul>
        </div>

        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          {activeSection === "accounts" && (
            <div id="accounts">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Account Setting</h1>
                <p className="font- text-slate-600">
                  Hello, <span>{username}</span>.
                </p>
              </div>
              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">My Address</p>
              <form className="py-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <select
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Province/City</option>
                    {provinces.map((province) => (
                      <option key={province.Id} value={province.Name}>
                        {province.Name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Name}>
                        {district.Name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    value={selectedWard}
                    onChange={handleWardChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Ward</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Name}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Address Line"
                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    disabled={!isEditing}
                  />
                </div>
                {!isEditing && (
                  <button
                    className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white w-40"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
                {isEditing && (
                  <button
                    className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-white w-40"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                )}
              </form>
            </div>
          )}

          {activeSection === "orderHistory" && (
            <div id="orderHistory">
              <div className="pt-4 overflow-auto">
                <h1 className="py-2 text-2xl font-semibold">Order History</h1>
                {orderData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={nodatafound}
                      alt="No data found"
                      className="w-64 h-64"
                    />
                    <p className="text-xl text-gray-600 font-semibold mt-4">
                      No order found
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
                    <table className="w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Order ID
                          </th>
                          <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Payment Status
                          </th>
                          <th className="px-8 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Total
                          </th>
                          <th className="px-20 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {orderData.map((order) => (
                          <tr key={order.order_id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              #{order.order_id.slice(0, 7)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {formatDate(order.updatedAt)}
                            </td>
                            <td className="whitespace-nowrap px-12 py-4 text-sm font-medium text-gray-900">
                              <span
                                className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${
                                  order.order_payment_status === "Unpaid"
                                    ? "bg-gray-300 text-gray-800"
                                    : order.order_status === "Cancelled"
                                    ? "bg-red-300 text-gray-800"
                                    : order.order_status === "Paid"
                                    ? "bg-green-300 text-gray-800"
                                    : ""
                                } dark:bg-gray-700 dark:text-gray-300`}
                              >
                                {order.order_payment_status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              <span
                                className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${
                                  order.order_status === "Pending"
                                    ? "bg-gray-300 text-gray-800"
                                    : order.order_status === "Cancelled"
                                    ? "bg-red-300 text-gray-800"
                                    : order.order_status === "Confirmed"
                                    ? "bg-green-300 text-gray-800"
                                    : order.order_status === "Shipping"
                                    ? "bg-blue-300 text-gray-800"
                                    : order.order_status === "Delivered"
                                    ? "bg-yellow-300 text-gray-800"
                                    : ""
                                } dark:bg-gray-700 dark:text-gray-300`}
                              >
                                {order.order_status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {formatNumber(order.order_final_price)}đ
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              <button
                                className={`rounded bg-blue-700 py-2 text-white px-4 ${
                                  order.order_status !== "Pending"
                                    ? "ml-6"
                                    : "ml-6"
                                }`}
                                onClick={() =>
                                  setOpenPopupOrderId(order.order_id)
                                }
                              >
                                View Details
                              </button>
                              {openPopupOrderId === order.order_id && (
                                <PopupViewProduct
                                  orderId={order.order_id}
                                  setIsOpenPopup={setOpenPopupOrderId}
                                />
                              )}
                              {order.order_status === "Pending" && (
                                <>
                                  <PopupNotification
                                    triggerText="Cancel"
                                    open={orderToCancel === order.order_id}
                                    onClose={() => setOrderToCancel(null)}
                                    modalTitle="Cancel Notification"
                                    confirmText="Confirm"
                                    cancelText="Cancel"
                                    confirmAction={() =>
                                      handleCancelOrder(order.order_id)
                                    }
                                    content="Are you sure you want to cancel this order?"
                                    triggerClassName="rounded bg-red-500 px-4 py-2 ml-4 text-white"
                                    confirmClassName="rounded bg-blue-700 px-4 py-2 ml-4 text-white"
                                    cancelClassName="rounded bg-gray-300 px-4 py-2 ml-4 text-gray-800"
                                  />
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
