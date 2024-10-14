import AuthContext from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const [error, setError] = useState(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        axios.defaults.baseURL + "/api/users/login",
        {
          username,
          password,
        }
      );
      const data = await response.data;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      save(data.accessToken);
      setAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data);
        setAuthenticated(false);
        remove();

        console.error("An error occurred: ", { error });
        if (error.status === 401) {
          alert("invalid credentials");
        } else {
          alert("An error occurred");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    remove();
  };

  const save = (accessToken: string) => {
    localStorage.setItem(
      import.meta.env.VITE_JWT_ACCESS_TOKEN || "",
      accessToken
    );
  };

  const getValueFromKey = (accessToken: string) => {
    return localStorage.getItem(accessToken || "");
  };

  const remove = () => {
    localStorage.removeItem(import.meta.env.VITE_JWT_ACCESS_TOKEN || "");
  };

  useEffect(() => {
    // set the axios to point to the correct backend url

    if (import.meta.env.VITE_NODE_ENV === "development") {
      axios.defaults.baseURL = import.meta.env.VITE_DEV_BACKEND_URL;
    } else {
      axios.defaults.baseURL = import.meta.env.VITE_PROD_BACKEND_URL;
    }

    // get value from local storage
    const accessToken = getValueFromKey(
      import.meta.env.VITE_JWT_ACCESS_TOKEN || ""
    );

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setAuthenticated(true);
    }

    setWaitAuthCheck(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        loading,
        error,
        login,
        logout,
        waitAuthCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
