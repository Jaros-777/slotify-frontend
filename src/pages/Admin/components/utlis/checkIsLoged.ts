import { useNavigate } from "react-router-dom";
import { useData } from "../../../../AppRouter";
import axios from "axios";
import { useCallback, useState } from "react";

type AuthRole = "admin" | "client"

export const useCheckIsLogged = (role: AuthRole) => {
  const { setUserToken, setIsAdminLogged, setClientToken, setIsClientLogged } = useData();
  const navigate = useNavigate();

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const checkIsLogged = useCallback(async () => {
    setIsAuthLoading(true);

    let token: string | null = null;
    if (role === "admin") {
      token = localStorage.getItem("token");

    } else {
      token = localStorage.getItem("clientToken");
    }


    if (!token) {
      navigate("/login");
      setIsAuthLoading(false);
      return false;
    }

    if (role === "admin") {
      setUserToken(token);

    } else {
      setClientToken(token);
    }

    try {
      await axios.get(`${import.meta.env.VITE_APP_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (role === "admin") {
        setIsAdminLogged(true);

      } else {
        setIsClientLogged(true)
      }

      setIsAuthLoading(false);
      return token;
    } catch (error) {
      console.log(error);
      navigate("/login");
      setIsAuthLoading(false);
      return false;
    }
  }, [navigate, setUserToken, setIsAdminLogged, setClientToken, setIsClientLogged]);

  return { checkIsLogged, isAuthLoading };
};

