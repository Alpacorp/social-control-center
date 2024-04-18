import { useState, useEffect } from "react";

export const useCheckRoleUser = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      const tokenValue = token.split("=")[1];
      const decodedToken = JSON.parse(atob(tokenValue.split(".")[1]));
      setIsAdmin(decodedToken.role === "admin");
    } else {
      setIsAdmin(false);
    }
  }, []);

  return [isAdmin];
};
