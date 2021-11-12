import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children, values }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
        ...values,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
