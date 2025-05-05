import React, {createContext, useContext, useEffect, useState} from "react";
import {decodeToken} from "@/helpers/decodeToken.jsx";

const RoleAuthContext = createContext();

export function useAuth() {
  return useContext(RoleAuthContext);
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState({
    role: null,
    token: null,
    isAuthenticated: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("tokenJWT");

    // Si hay un token en localStorage, decodificamos el token para obtener el rol
    if (storedToken) {
      const payload = decodeToken(storedToken);
      if (payload && payload.authorities && payload.authorities.length > 0) {
        const role = JSON.parse(payload.authorities)[0].authority;

        // Establecemos el estado con los datos del token
        setUser({
          role: role,
          token: storedToken,
          isAuthenticated: true,
        });
      }
    }
    setLoading(false);
  }, []);  // El useEffect solo se ejecuta una vez al montarse el componente

  const loginUserContext = (userData) => {
    console.log("Actualizando usuario en el contexto", userData);
    setUser(userData);
  };

  const logoutUserContext = () => {
    setUser({ nombre: null, role: null, token: null, isAuthenticated: false });
    localStorage.removeItem("tokenJWT");
  };

  return (
    <RoleAuthContext.Provider value={{ user, loginUserContext, logoutUserContext, loading  }}>
      {children}
    </RoleAuthContext.Provider>
  );
}