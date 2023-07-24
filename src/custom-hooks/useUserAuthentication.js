import { useEffect, useState, useCallback } from "react";
import { useBeforeUnload } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTHENTICATION_COOKIE_KEY } from "../utils/constants/app-constants";

const API_URL = `https://compareprivateplanes.com/wp-json/wp/v2`;

function useUserAuthentication() {
  const cookies = Cookies.get();
  const [, loggedInUserLogin] = Object.entries(cookies).find(([key]) =>
    key.includes(AUTHENTICATION_COOKIE_KEY)
  ) || [undefined, undefined];

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    try {
      setIsAuthenticating(true);

      if (!loggedInUserLogin) throw new Error("No access code found");

      const userlogin = decodeURI(loggedInUserLogin);
      const { data: targetUserMemberships } = await axios(
        `${API_URL}/user-membership/`,
        { params: { userlogin } }
      );

      // Check if any membership is found against user login
      if (targetUserMemberships.length === 0)
        throw new Error("No membership found");

      // Check if membership is active
      if ((targetUserMemberships[0] || {}).status !== "active")
        throw new Error("Membership expired");

      // If membership is active
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error in authenticating user");
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, [loggedInUserLogin]);

  useBeforeUnload(
    useCallback(() => {
      Cookies.remove(AUTHENTICATION_COOKIE_KEY);
      localStorage.setItem("test", "cleared");
    }, [])
  );

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return {
    isAuthenticating,
    isAuthenticated,
  };
}

export default useUserAuthentication;
