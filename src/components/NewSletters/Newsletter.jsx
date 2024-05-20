import React from "react";


const BannerImg = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Newsletter = () => {
  return (
    <div
      data-aos="zoom-in"
      className="mb-0 bg-gray-100 dark:bg-gray-800 text-black "
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h2 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold font-spartan">
            Subscribe to our Newsletter
          </h2>
          <p className="!text-center sm:text-left font-regular font-spartan">
            Get exclusive new products and vouchers
          </p>

          <form className="text-center">
            <input
              data-aos="fade-up"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3  bg-transparent outline-none border-b-2 pl-2 border-black md:w-96 mb-5 placeholder:text-black/50 mr-4"
            />
            <input type="submit" value={"submit"} className='bg-black text-white px-6 py-1 w-36 h-10 cursor-pointer'></input>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Newsletter;