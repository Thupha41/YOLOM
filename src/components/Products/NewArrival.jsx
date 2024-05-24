import React from "react";
import ProductSlider from "../ProductSlider/ProductSlider";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
const NewArrival = () => {
  return (
    <div>
      <ProductSlider
        homeTitle="New Arrivals"
        homeDescription="Discover the latest arrivals"
        Tag="New Arrival"
      />
      <Link to="/new-arrival" onClick={() => window.scrollTo(0, 0)}>
        <Button content="View All"></Button>
      </Link>
    </div>
  );
};

export default NewArrival;
