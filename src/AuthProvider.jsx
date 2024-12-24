import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token); 
      } else {
        handleLogout();
      }
    } 
    else {
      setLoading(false);
    }
  }, []);

  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/profile/user-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data); 
    } 
    catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout();
    } 
    finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); 
  };

  const logout = () => {
    handleLogout();
  };
 
 
  return (
    <AuthContext.Provider
      value={{
        user, 
        loading,
        login,
        logout, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
