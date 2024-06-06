import React from "react";
import HomeBanner from "../../components/Banner/HomeBanner";
import Brand from "../../components/Products/Brand";
import NewArrival from "../../components/Products/NewArrival";
// import SaleProduct from '../../components/Products/SaleProduct'
import Newsletter from "../../components/NewSletters/Newsletter";
// import BlogHomePage from '../../components/BlogHomePage/BlogHomePage'
const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Brand />
      {/* <SaleProduct/> */}
      <NewArrival />
      {/* <BlogHomePage/> */}
      <Newsletter />
    </div>
  );
};

export default Home;
