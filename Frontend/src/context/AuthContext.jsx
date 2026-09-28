import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context.js";

const TOKEN_KEY = "folkatech_token";

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
    };

    window.addEventListener("folkatech:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("folkatech:unauthorized", handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login: (nextToken) => {
        localStorage.setItem(TOKEN_KEY, nextToken);
        setToken(nextToken);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      },
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
