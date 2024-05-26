import React from "react";
import Navbar from "./components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import ShopCategory from "./Pages/ShopCategory/ShopCategory";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AboutUs from "./Pages/AboutUs/AboutUs";
import bannerImg4 from "./assets/slidingImg/bannerImg4.png";
import bannerImg_MSS from "./assets/slidingImg/bannerImg_MSS.png";
import Product from "./Pages/Product/Product";
import RegisterPage from "./Pages/LoginSignup/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginSignup/LoginPage/LoginPage";
import CustomerSupportPage from "./Pages/CustomerSupportPage/CustomerSupportPage";
import Contact from "./Pages/Contact/Contact";
import HashCheckout from "./Pages/Checkout/HashCheckout";
import AccountSetting from "./Pages/AccountSetting/AccountSetting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/new-arrival",
        element: (
          <ShopCategory
            Tag="New Arrival"
            banner={bannerImg4}
            title="New Arrival"
          />
        ),
        children: [
          {
            path: ":Brand",
            element: <ShopCategory Tag="New Arrival" banner={bannerImg4} />,
          },
        ],
      },
      {
        path: "/promotion",
        element: (
          <ShopCategory
            Tag="Sale"
            banner={bannerImg_MSS}
            title="Sale Off Products"
          />
        ),
        children: [
          {
            path: ":Brand",
            element: <ShopCategory Tag="Sale" banner={bannerImg_MSS} />,
          },
        ],
      },
      {
        path: "/all-product",
        element: <ShopCategory banner={bannerImg4} title="New Arrival" />,
        children: [
          {
            path: ":Brand",
            element: <ShopCategory banner={bannerImg4} />,
          },
        ],
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/register",
        element: <RegisterPage />,
      },

      {
        path: "/introduction/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },

      {
        path: "/product",
        element: <Product />,
        children: [
          {
            path: "/product/:Slug",
            element: <Product />,
          },
        ],
      },

      {
        path: "/customer-support",
        element: <CustomerSupportPage />,
      },

      {
        path: "/account",
        element: <AccountSetting />,
      },
    ],
  },
  // {
  //   path: "/checkout/shipping",
  //   element: <Shipping/>
  // },

  {
    path: "/checkout",
    element: <HashCheckout />,
  },
]);

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
