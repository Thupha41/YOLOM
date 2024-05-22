import React, { useEffect, useState } from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import SuccessOrder from "./SuccessOrder"; // Import the new component

const HashCheckout = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!["#shipping", "#payment", "#success"].includes(currentHash)) {
      window.location.replace(`${window.location.pathname}#shipping`);
    }
  }, [currentHash]);

  return (
    <>
      {currentHash === "#shipping" && <Shipping />}
      {currentHash === "#payment" && <Payment />}
      {currentHash === "#success" && <SuccessOrder />}
    </>
  );
};

export default HashCheckout;
