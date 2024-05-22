import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessOrder = () => {
  // Navigate
  const navigate = useNavigate();

  const handleNavigateToOrderHistory = () => {
    window.scrollTo(0, 0);
    navigate("/account", { state: { activeSection: "orderHistory" } });
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
                  window.location.replace("/checkout/#payment");
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
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4">
              <h6 className="text-base font-bold text-[#333]">Payment</h6>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">3</span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="text-base font-bold text-[#333]">Success</h6>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
          <div className="text-center">
            <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold">Payment successful</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl md:mx-auto dark:text-gray-400">
              Your order has been confirmed and is being processed. You will
              receive an email confirmation shortly.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <div className="p-4">
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <div>Order number</div>
                  <div className="ml-2 font-medium">#123456</div>
                </div>
                <div className="flex justify-between">
                  <div>Date</div>
                  <div className="ml-2 font-medium">March 29, 2024</div>
                </div>
                <div className="flex justify-between">
                  <div>Total</div>
                  <div className="ml-2 font-medium">$129.00</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <button
                className="w-full"
                type="submit"
                onClick={handleNavigateToOrderHistory}
              >
                View my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default SuccessOrder;
