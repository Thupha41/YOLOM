import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import formatNumber from "../../utils/formatCurrency";
import QuantityUpdate from "../../components/QuantityUpdate/QuantityUpdate";
import { useNavigate, Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import emptyCart from "../../assets/emptyCart.png";

const Shipping = () => {
  const { removeFromCart, totalCartAmount, getTotalCartItems, cartItems } =
    useContext(ShopContext);
  const [messages, setMessages] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [wards, setWards] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  // Error Messages
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [provinceError, setProvinceError] = useState(false);
  const [errAddress, setErrAddress] = useState("");
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);

  // localStorage section: store all the information that user input
  const [checkoutData, setCheckoutData] = useState({
    shippingAddressFormData: {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
      email: "",
    },
  });

  const handleMessages = (e) => {
    setMessages(e.target.value);
  };

  // Email Validation
  const emailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  // Name Validation
  const firstNameValidation = (name) => {
    return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/u.test(
      name
    );
  };
  const lastNameValidation = (name) => {
    return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/u.test(
      name
    );
  };

  // Phone Validation
  const phoneValidation = (phone) => {
    return /^0[35789][0-9]{8}$/.test(phone);
  };

  // Address Validation
  const addressValidation = (address) => {
    const regex =
      /^([0-9A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ.,/\s]+){2,}$/i;
    return regex.test(address);
  };

  // Navigate
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    window.scrollTo(0, 0);
    navigate("/cart");
  };

  // Fetch provinces and districts
  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces data: ", error);
    }
  };
  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.get(
          "https://api.yourrlove.com/v1/web/orders/deliveryinfor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.metadata;
        setDeliveryInfo(data);
        if (data.personal_detail) {
          setCheckoutData({
            shippingAddressFormData: {
              firstName: data.personal_detail.first_name || "",
              lastName: data.personal_detail.last_name || "",
              phone: data.personal_detail.phone_number || "",
              email: data.personal_detail.email || "",
              city: data.shipping_address
                ? data.shipping_address.province_city
                : "",
              district: data.shipping_address
                ? data.shipping_address.district
                : "",
              ward: data.shipping_address ? data.shipping_address.ward : "",
              address: data.shipping_address
                ? data.shipping_address.street
                : "",
            },
          });
          setSelectedProvince(
            data.shipping_address ? data.shipping_address.province_city : ""
          );
          setSelectedDistrict(
            data.shipping_address ? data.shipping_address.district : ""
          );
          setSelectedWard(
            data.shipping_address ? data.shipping_address.ward : ""
          );
        }
      } catch (error) {
        console.error("Error fetching delivery information:", error);
      }
    };

    fetchDeliveryInfo();
    fetchProvinces();
  }, []);
  useEffect(() => {
    // Assuming provinces are already fetched and available
    if (selectedProvince) {
      const foundProvince = provinces.find(
        (province) => province.Name === selectedProvince
      );
      if (foundProvince) {
        setDistricts(foundProvince.Districts);
        if (selectedDistrict) {
          const foundDistrict = foundProvince.Districts.find(
            (district) => district.Name === selectedDistrict
          );
          if (foundDistrict) {
            setWards(foundDistrict.Wards);
          }
        }
      }
    }
  }, [provinces, selectedProvince, selectedDistrict]);

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
    setCheckoutData({
      ...checkoutData,
      shippingAddressFormData: {
        ...checkoutData.shippingAddressFormData,
        city: provinceName,
        district: "",
        ward: "",
      },
    });

    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setCheckoutData({
      ...checkoutData,
      shippingAddressFormData: {
        ...checkoutData.shippingAddressFormData,
        district: districtName,
        ward: "",
      },
    });
    setSelectedWard("");
  };
  const handleWardChange = (e) => {
    const wardName = e.target.value;
    setSelectedWard(wardName);
    setCheckoutData({
      ...checkoutData,
      shippingAddressFormData: {
        ...checkoutData.shippingAddressFormData,
        ward: wardName,
      },
    });
  };

  const handleInputChange = (field, value) => {
    setCheckoutData((prevData) => ({
      ...prevData,
      shippingAddressFormData: {
        ...prevData.shippingAddressFormData,
        [field]: value,
      },
    }));
  };
  // Function to render cart items
  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center">
          <img src={emptyCart} alt="Empty Cart" className="w-full h-full  " />
          <p className="mt-2 text-xl text-center font-semibold text-white">
            Your cart is empty!
          </p>
        </div>
      );
    }
    return cartItems.map((item) => {
      const product = item.ProductDetail;
      const totalPrice = product.Product.product_price * item.quantity;
      return (
        <div
          key={product.sku_id}
          className="grid sm:grid-cols-2 items-start gap-6"
        >
          <div className="px-0 py-0 shrink-0 bg-gray-50 rounded-md">
            <Link
              to={`/product/${item.ProductDetail.sku_slug}`}
              key={item.ProductDetail.sku_id}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={product.sku_image[0]}
                className="w-full object-cover h-[260px]"
                alt={product.Product.product_name}
              />
            </Link>
          </div>
          <div>
            <h3 className="text-base text-white">
              {product.Product.Brand.name}
            </h3>
            <h4 className="text-[12px] text-white">
              {product.Product.product_name}
            </h4>
            <ul className="text-xs text-white space-y-3 mt-4">
              <li>Color: {product.sku_color}</li>
              <li>Size: {product.sku_size}</li>
              <li>
                Price:{" "}
                <span className="text-red-500">
                  {formatNumber(product.Product.product_price)}đ
                </span>
              </li>
              <li>Quantity:</li>
              <li>
                <QuantityUpdate id={product.sku_id} />{" "}
              </li>
              <li>Total Price: {formatNumber(totalPrice)} đ</li>
              <li>
                <div className="relative flex items-center">
                  <button
                    onClick={() => removeFromCart(product.sku_id)}
                    className="bg-gradient-to-r from-[#3f3f3f] to-[#3f3f3f] transition-all duration-200 text-black py-1 px-0 rounded-full flex items-center gap-3 group"
                  >
                    <span className="group-hover:block hidden transition-all duration-200 text-white">
                      Delete
                    </span>
                    <FaRegTrashCan className="text-xl text-white drop-shadow-sm cursor-pointer" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  };

  // Restore data from localStorage whenever component loads
  useEffect(() => {
    const data = localStorage.getItem("checkout-data");
    if (data) {
      const formData = JSON.parse(data).shippingAddressFormData;
      setCheckoutData({ shippingAddressFormData: formData });
      setSelectedProvince(formData.city);
      setSelectedDistrict(formData.district);
      setSelectedWard(formData.ward);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkout-data", JSON.stringify(checkoutData));
  }, [checkoutData]);

  // form validate
  const handleShippingForm = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!checkoutData.shippingAddressFormData.firstName) {
      setErrFirstName("Required");
      hasError = true;
    } else if (
      !firstNameValidation(checkoutData.shippingAddressFormData.firstName)
    ) {
      setErrFirstName("Invalid");
      hasError = true;
    } else {
      setErrFirstName("");
    }
    if (!checkoutData.shippingAddressFormData.lastName) {
      setErrFirstName("Required");
      hasError = true;
    } else if (
      !lastNameValidation(checkoutData.shippingAddressFormData.lastName)
    ) {
      setErrLastName("Invalid");
      hasError = true;
    } else {
      setErrLastName("");
    }
    if (!checkoutData.shippingAddressFormData.email) {
      setErrEmail("Required");
      hasError = true;
    } else if (!emailValidation(checkoutData.shippingAddressFormData.email)) {
      setErrEmail("Invalid");
      hasError = true;
    } else {
      setErrEmail("");
    }
    if (!checkoutData.shippingAddressFormData.phone) {
      setErrPhone("Required");
      hasError = true;
    } else if (!phoneValidation(checkoutData.shippingAddressFormData.phone)) {
      setErrPhone(
        "Enter a valid phone number. It should start with 0 and contain 11 numbers"
      );
      hasError = true;
    } else {
      setErrPhone("");
    }
    // Validate province
    if (!selectedProvince) {
      setProvinceError(true);
      hasError = true;
    } else {
      setProvinceError(false);
    }

    if (!selectedDistrict) {
      setDistrictError(true);
      hasError = true;
    } else {
      setDistrictError(false);
    }

    if (!selectedWard) {
      setWardError(true);
      hasError = true;
    } else {
      setWardError(false);
    }

    // Validate Address
    if (!checkoutData.shippingAddressFormData.address) {
      setErrAddress("Required");
      hasError = true;
    } else if (
      !addressValidation(checkoutData.shippingAddressFormData.address)
    ) {
      setErrAddress("Invalid");
      hasError = true;
    } else {
      setErrAddress("");
    }

    if (
      hasError &&
      !addressValidation(checkoutData.shippingAddressFormData.address)
    ) {
      setFormError("Please input a correct format address!");
    } else if (
      hasError &&
      !firstNameValidation(checkoutData.shippingAddressFormData.firstName)
    ) {
      setFormError("Please input a correct format name!");
    } else if (
      hasError &&
      !lastNameValidation(checkoutData.shippingAddressFormData.lastName)
    ) {
      setFormError("Please input a correct format name!");
    } else if (
      hasError &&
      !emailValidation(checkoutData.shippingAddressFormData.email)
    ) {
      setFormError("Please input a correct format email!");
    } else if (
      hasError &&
      !phoneValidation(checkoutData.shippingAddressFormData.phone)
    ) {
      setFormError("Please input a correct format phone!");
    } else if (hasError) {
      setFormError("Please input all the fields required!");
    } else {
      setFormError("");
      window.scrollTo(0, 0);
      window.location.replace("/checkout/#payment");
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
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">1</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4">
              <h6 className="text-base font-bold text-[#333]">Shipping</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4">
              <h6 className="text-base font-bold text-gray-400">Payment</h6>
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
        <div className="font-[sans-serif] bg-gray-50 max-w-screen-2x1 mx-auto container xl:px-28 px-4 py-20">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
            {/* Left side */}
            <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
              <div className="relative h-full">
                <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                  <h2 className="text-2xl font-bold text-white">
                    Order Summary
                  </h2>
                  <h3 className="text-xl font-bold text-white">
                    {" "}
                    ({getTotalCartItems()} items)
                  </h3>
                  <div className="space-y-6 mt-10">{renderCartItems()}</div>
                </div>
                <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
                  <h4 className="flex flex-wrap gap-4 text-base text-white">
                    Total{" "}
                    <span className="ml-auto">
                      {formatNumber(totalCartAmount)} đ
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
              <h2 className="text-2xl font-bold text-[#333]">
                Complete your order
              </h2>
              <form
                className="mt-10"
                onSubmit={handleShippingForm}
                type="submit"
              >
                {/* Personal Detail */}
                <div>
                  <h3 className="text-lg font-bold text-[#333] mb-6">
                    Personal Details
                  </h3>
                  {formError && (
                    <div style={{ color: "red" }} className="mb-4">
                      {formError}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="relative flex items-center">
                      <p className="px-4 py-3.5 bg-white text-gray-500 w-full text-sm border-b-2 focus:border-[#333] outline-none">
                        {checkoutData.shippingAddressFormData.firstName}
                      </p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>

                    {/* Last name */}
                    <div className="relative flex items-center">
                      <p className="px-4 py-3.5 bg-white text-gray-500 w-full text-sm border-b-2 focus:border-[#333] outline-none">
                        {checkoutData.shippingAddressFormData.lastName}
                      </p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>

                    {/* Email */}
                    <div className="relative flex items-center">
                      <p className="px-4 py-3.5 bg-white text-gray-500 w-full text-sm border-b-2 focus:border-[#333] outline-none">
                        {checkoutData.shippingAddressFormData.email}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                              d="M0 512h512V0H0Z"
                              data-original="#000000"
                            ></path>
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    </div>

                    {/* Phone number */}
                    <div className="relative flex items-center">
                      <p className="px-4 py-3.5 bg-white text-gray-500 w-full text-sm border-b-2 focus:border-[#333] outline-none">
                        {checkoutData.shippingAddressFormData.phone}
                      </p>

                      <svg
                        fill="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Shipping Address */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-[#333] mb-6">
                    Shipping Address
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Province */}
                    <select
                      className={`px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none ${
                        provinceError ? "border-red-600" : ""
                      }`}
                      onChange={handleProvinceChange}
                      value={checkoutData.shippingAddressFormData.city}
                    >
                      <option value="">Province / City *</option>
                      {provinces.map((province) => (
                        <option key={province.Id} value={province.Name}>
                          {province.Name}
                        </option>
                      ))}
                    </select>

                    {/* District */}
                    <select
                      className={`px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none ${
                        districtError ? "border-red-600" : ""
                      }`}
                      onChange={handleDistrictChange}
                      value={checkoutData.shippingAddressFormData.district}
                      disabled={!selectedProvince}
                    >
                      <option value="">District *</option>
                      {districts.map((district) => (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                    {/* Ward */}
                    <select
                      className={`px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none ${
                        wardError ? "border-red-600" : ""
                      }`}
                      disabled={!selectedDistrict || wards.length === 0}
                      value={
                        selectedDistrict && wards.length > 0
                          ? checkoutData.shippingAddressFormData.ward
                          : ""
                      }
                      onChange={handleWardChange}
                    >
                      <option value="">Ward *</option>
                      {wards.map((ward) => (
                        <option key={ward.Id} value={ward.Name}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                    {/* Address */}
                    <div className="flex items-center">
                      <input
                        name="address"
                        type="text"
                        placeholder="Address Line *"
                        className={`px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none  ${
                          errAddress ? "border-red-600" : ""
                        }`}
                        value={checkoutData.shippingAddressFormData.address}
                        onChange={(e) => {
                          handleInputChange(e.target.name, e.target.value);
                          setErrAddress("");
                          setFormError("");
                        }}
                      />
                      {errAddress ? (
                        <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                          <span className="text-sm italic font-bold">!</span>
                          {errAddress}
                        </p>
                      ) : (
                        <svg
                          className="w-[18px] h-[18px] dark:text-white absolute right-12"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-[#333] mb-6">
                      Order Notes
                    </h3>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div className="px-4 py-2 bg-white rounded-t-lg">
                        <label htmlFor="comment" className="sr-only">
                          Your comment
                        </label>
                        <textarea
                          onChange={handleMessages}
                          value={messages}
                          id="comment"
                          rows="4"
                          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white"
                          placeholder="Write a note..."
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-6 max-sm:flex-col mt-10">
                    <button
                      type="button"
                      className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]"
                      onClick={handleReturnToCart}
                    >
                      Return to cart
                    </button>
                    <button
                      type="button"
                      className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]"
                      onClick={handleShippingForm}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
