import React, { useRef, useContext, useState, Fragment } from "react";
import Logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import emptyCart from "../../assets/emptyCart.png";
import { Tooltip } from "../Tooltip/Tooltip";
import formatNumber from "../../utils/formatCurrency";
import useUserData from "../../hooks/useUserData";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import QuantityUpdate from "../QuantityUpdate/QuantityUpdate";
import { FaRegTrashCan } from "react-icons/fa6";

const Menu = [
  {
    id: 1,
    name: "SALE",
    link: "/promotion",
    dropdownLinks: [
      {
        id: 1,
        name: "O21_CTTT",
        link: "/promotion/O21_CTTT",
      },
      {
        id: 2,
        name: "Cotton On",
        link: "/promotion/COTTON ON",
      },
      {
        id: 3,
        name: "Levi's",
        link: "/promotion/LEVI'S",
      },
      {
        id: 4,
        name: "Banana Republic",
        link: "/promotion/BANANA_REPUBLIC",
      },
      {
        id: 5,
        name: "Old Navy",
        link: "/promotion/OLD NAVY",
      },
      {
        id: 6,
        name: "GAP",
        link: "/promotion/GAP",
      },
      {
        id: 7,
        name: "Mango",
        link: "/promotion/MANGO",
      },
    ],
  },

  {
    id: 2,
    name: "New Arrivals",
    link: "/new-arrival",
    dropdownLinks: [
      {
        id: 1,
        name: "O21_CTTT",
        link: "/new-arrival/O21_CTTT",
      },
      {
        id: 2,
        name: "Cotton On",
        link: "/new-arrival/COTTON ON",
      },
      {
        id: 3,
        name: "Levi's",
        link: "/new-arrival/LEVI'S",
      },
      {
        id: 4,
        name: "Banana Republic",
        link: "/new-arrival/BANANA_REPUBLIC",
      },
      {
        id: 5,
        name: "Old Navy",
        link: "/new-arrival/OLD NAVY",
      },
      {
        id: 6,
        name: "GAP",
        link: "/new-arrival/GAP",
      },
      {
        id: 7,
        name: "Mango",
        link: "/new-arrival/MANGO",
      },
    ],
  },

  {
    id: 3,
    name: "Blogs",
    link: "/blog",
    dropdownLinks: [],
  },
  {
    id: 4,
    name: "About us",
    link: "/introduction/about-us",
    dropdownLinks: [],
  },

  {
    id: 5,
    name: "Contact us",
    link: "/contact-us",
    dropdownLinks: [],
  },
];

const Navbar = () => {
  const { cartItems, totalCartAmount, getTotalCartItems, removeFromCart } =
    useContext(ShopContext);
  const isCartEmpty = cartItems.length === 0;
  const menuRef = useRef();
  const [open, setOpen] = useState(false);
  const totalItems = getTotalCartItems();
  const toggleCartPanel = () => {
    setOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const username = useUserData();
  const [results, setResults] = useState([]);
  return (
    <div className="relative shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-10">
      {/* upper Navbar */}
      <div className="bg-upperNavbar py-4">
        <div className="container flex justify-between items-center">
          <div>
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              <span
                style={{
                  fontFamily: "Suranna",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                YOLOM
              </span>
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <SearchBar />

            {/* notification button */}
            <div>
              <button
                onClick={() => alert()}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <IoMdNotifications className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </div>

            {/* account button */}
            <div>
              {localStorage.getItem("auth-token") ? (
                <Tooltip
                  position="bottom"
                  content={
                    <div className="tooltip-content">
                      <h3 className="text-lg font-bold mb-2">
                        WELCOME, {username}
                      </h3>
                      <hr />
                      <div>
                        <p className="text-sm font-semibold mb-1 mt-4">
                          YOLOM ACCOUNT GIVES YOU...
                        </p>
                        <ul className="text-sm mb-4 list-disc pl-5">
                          <li>Surprise member-exclusive offers</li>
                          <li>Browse your purchase history</li>
                          <li>Save favorite items to your wishlist</li>
                        </ul>
                      </div>
                      <ul className="text-sm mb-4 list-disc pl-5">
                        <li>
                          <Link
                            to="/account"
                            state={{ activeSection: "orderHistory" }}
                            className="text-blue-600 hover:underline text-[16px]"
                          >
                            Orders
                          </Link>
                        </li>
                        <li className="mt-2">
                          <Link
                            to="/account"
                            className="text-blue-600 hover:underline text-[16px]"
                          >
                            Account Setting
                          </Link>
                        </li>
                        <li className="mt-2">
                          <button
                            className="text-blue-600 hover:underline text-[16px]"
                            onClick={() => {
                              localStorage.removeItem("auth-token");
                              localStorage.removeItem("cart");
                              // localStorage.removeItem("account-address");
                              localStorage.removeItem("checkout-data");
                              window.location.replace("/");
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  }
                >
                  <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
                    <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip
                  position="bottom"
                  content={
                    <div className="tooltip-content">
                      <h3 className="text-lg font-bold mb-2">WELCOME</h3>
                      <hr />
                      <p className="text-sm font-semibold mb-1 mt-4">
                        YOLOM ACCOUNT GIVES YOU...
                      </p>
                      <ul className="text-sm mb-4 list-disc pl-5">
                        <li>Surprise member-exclusive offers</li>
                        <li>Browse your purchase history</li>
                        <li>Save favorite items to your wishlist</li>
                      </ul>
                      <p className="text-sm">
                        Create an account or login below
                      </p>
                      <p className="text-sm mb-4">
                        and instantly enjoy benefits
                      </p>
                      <button>
                        <Link
                          to="/register"
                          onClick={() => window.scrollTo(0, 0)}
                          className="text-blue-600 hover:underline text-[16px]"
                        >
                          Create An Account
                        </Link>
                      </button>
                      <br />
                      <button className="mt-2 mb-2">
                        <Link
                          to="/login"
                          onClick={() => window.scrollTo(0, 0)}
                          className="text-blue-600 hover:underline text-[16px]"
                        >
                          Login
                        </Link>
                      </button>
                    </div>
                  }
                >
                  <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
                    <FaUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
                  </button>
                </Tooltip>
              )}
            </div>

            {/* cart button */}
            <div className="relative flex items-center">
              <button
                onClick={toggleCartPanel}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <span className="group-hover:block hidden transition-all duration-200">
                  Cart
                </span>
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>

              <div className="w-7 h-6 flex justify-center items-center mt-[-35px] ml-[-20px] text-white text-xs bg-red-500 rounded-full">
                {getTotalCartItems() > 0 ? getTotalCartItems() : "0"}
              </div>

              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                  <Dialog.Title className="text-lg font-medium text-gray-900">
                                    Shopping cart ({totalItems} items)
                                  </Dialog.Title>
                                  <div className="ml-3 flex h-7 items-center">
                                    <button
                                      type="button"
                                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="absolute -inset-0.5" />
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-8">
                                  <div className="flow-root">
                                    {!isCartEmpty ? (
                                      <ul
                                        role="list"
                                        className="-my-6 divide-y divide-gray-200"
                                      >
                                        {cartItems.map((item) => (
                                          <li
                                            key={item.product_id}
                                            className="flex py-6"
                                          >
                                            <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <Link
                                                to={`/product/${item.ProductDetail.sku_slug}`}
                                                key={item.ProductDetail.sku_id}
                                                onClick={() => {
                                                  handleLinkClick();
                                                  window.scrollTo(0, 0);
                                                }}
                                              >
                                                <img
                                                  src={
                                                    item.ProductDetail
                                                      .sku_image[0]
                                                  }
                                                  alt={
                                                    item.ProductDetail.Product
                                                      .product_name
                                                  }
                                                  className="h-full w-full object-cover object-center"
                                                />
                                              </Link>
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                              <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                  <h2>
                                                    {
                                                      item.ProductDetail.Product
                                                        .Brand.name
                                                    }
                                                  </h2>

                                                  <p className="ml-4">
                                                    {formatNumber(
                                                      item.ProductDetail.Product
                                                        .product_price
                                                    )}
                                                    đ
                                                  </p>
                                                </div>
                                                <h3>
                                                  <Link
                                                    to={`/product/${item.ProductDetail.sku_slug}`}
                                                    key={
                                                      item.ProductDetail.sku_id
                                                    }
                                                    onClick={() => {
                                                      handleLinkClick();
                                                      window.scrollTo(0, 0);
                                                    }}
                                                  >
                                                    {
                                                      item.ProductDetail.Product
                                                        .product_name
                                                    }
                                                  </Link>
                                                </h3>
                                                <div className="flex justify-left gap-4 mt-2">
                                                  <p className="mt-1 text-sm text-gray-500">
                                                    Color:{" "}
                                                    {
                                                      item.ProductDetail
                                                        .sku_color
                                                    }
                                                  </p>
                                                  <p className="mt-1 text-sm text-gray-500">
                                                    Size:{" "}
                                                    {
                                                      item.ProductDetail
                                                        .sku_size
                                                    }
                                                  </p>
                                                </div>
                                              </div>

                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex justify-left gap-4">
                                                  <p className="text-gray-500">
                                                    Quantity:{" "}
                                                  </p>
                                                  <QuantityUpdate
                                                    id={item.sku_id}
                                                  />
                                                </div>

                                                <div className="flex">
                                                  <div className="relative flex items-center">
                                                    <button
                                                      onClick={() =>
                                                        removeFromCart(
                                                          item.sku_id
                                                        )
                                                      }
                                                    >
                                                      <FaRegTrashCan className="text-xl text-black drop-shadow-sm cursor-pointer" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <img
                                          src={emptyCart}
                                          alt="Empty Cart"
                                          className="w-full h-full"
                                        />
                                        <p className="mt-2 text-xl text-center font-semibold">
                                          Your cart is empty!
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {!isCartEmpty && (
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p className="font-manrope font-medium text-lg leading-9 text-indigo-500">
                                      {formatNumber(totalCartAmount)}đ
                                    </p>
                                  </div>
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                  <div className="mt-6">
                                    <Link
                                      to="/checkout"
                                      className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                                      onClick={() => {
                                        handleLinkClick();
                                        window.scrollTo(0, 0);
                                      }}
                                    >
                                      Checkout
                                    </Link>
                                  </div>
                                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                      or{" "}
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => setOpen(false)}
                                      >
                                        <Link
                                          to="/cart"
                                          onClick={() => {
                                            handleLinkClick();
                                            window.scrollTo(0, 0);
                                          }}
                                        >
                                          View cart detail
                                        </Link>
                                        <span aria-hidden="true"> &rarr;</span>
                                      </button>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center py-4">
        <ul
          ref={menuRef}
          className="sm:flex hidden items-center gap-6 font-spartan"
        >
          {Menu.map((menuItem) => (
            <li
              key={menuItem.id}
              className="group relative cursor-pointer font-spartan"
            >
              <Link
                to={menuItem.link}
                onClick={() => window.scrollTo(0, 0)}
                className={`semi-bold inline-flex items-center px-4 hover:text-primary duration-200 ${
                  menuItem.name === "SALE" ? "font-bold text-red-500" : ""
                }`}
              >
                {menuItem.name}
                {menuItem.dropdownLinks.length > 0 && (
                  <span>
                    <FaCaretDown className="ml-1 transition-all duration-200 group-hover:rotate-180" />
                  </span>
                )}
              </Link>
              {menuItem.dropdownLinks.length > 0 && (
                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {menuItem.dropdownLinks.map((dropdownItem) => (
                      <li key={dropdownItem.id}>
                        <a
                          href={dropdownItem.link}
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {dropdownItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
