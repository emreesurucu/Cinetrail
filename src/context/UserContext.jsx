import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({children}) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("userInfo");
            if (storedToken) {
                setUser(JSON.parse(storedUser));
            }
            setToken(storedToken);
        }, []
    )

  return (
    <UserContext.Provider value={{token, setToken, user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}