import { useState, useEffect } from "react";
import axios from "axios";

const useCartIdData = () => {
  const [cartId, setCartId] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (!authToken) {
          setCartId("");
          return;
        }

        const response = await axios.get(
          "https://api.yourrlove.com/v1/web/users/me",

          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
          setCartId(response.data.metadata.cart.cart_id);
        } else {
          setCartId("");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setCartId("");
      }
    };

    fetchUserData();
  }, []);
  return cartId;
};

export default useCartIdData;
