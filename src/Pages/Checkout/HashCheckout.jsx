import React, { useEffect, useState } from 'react';
import Shipping from './Shipping';
import Payment from './Payment';

const HashCheckout = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (currentHash !== '#shipping' && currentHash !== '#payment') {
      window.location.replace(`${window.location.pathname}#shipping`);
    }
  }, [currentHash]);

  return (
    <>
      {currentHash === '#shipping' && <Shipping />}
      {currentHash === '#payment' && <Payment />}
    </>
  );
};

export default HashCheckout;
