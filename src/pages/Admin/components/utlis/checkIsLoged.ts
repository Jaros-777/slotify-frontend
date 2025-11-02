import { useNavigate } from "react-router-dom";
import { useData } from "../../../../AppRouter";
import axios from "axios";
import { useCallback, useState } from "react";

export const useCheckIsLogged = () => {
  const { setUserToken, setIsLogged } = useData();
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const checkIsLogged = useCallback(async () => {
    setIsAuthLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      setIsAuthLoading(false);
      return false;
    }

    setUserToken(token);

    try {
      await axios.get("http://localhost:8080/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLogged(true);
      setIsAuthLoading(false);
      return token;
    } catch (error) {
      console.log(error);
      navigate("/login");
      setIsAuthLoading(false);
      return false;
    }
  }, [navigate, setUserToken, setIsLogged]);

  return { checkIsLogged, isAuthLoading };
};

