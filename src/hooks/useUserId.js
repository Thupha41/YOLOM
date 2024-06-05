import { useState, useEffect } from "react";
import axios from "axios";

const useUserId = () => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (!authToken) {
          setUserId("");
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
          setUserId(response.data.metadata.cart.user_id);
        } else {
          setUserId("");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserId("");
      }
    };

    fetchUserData();
  }, []);
  return userId;
};

export default useUserId;
