import React from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import SuccessOrder from "./SuccessOrder";
const Checkout = () => {
  return (
    <>
      <Shipping />
      <Payment />
      <SuccessOrder />
    </>
  );
};

export default Checkout;
