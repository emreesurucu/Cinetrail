import React from "react";
import ThemeContextProvider from "./Themecontext"
import UserContextProvider from "./UserContext"

export default function CombinedContextProvider({children}) {
    return (
      <ThemeContextProvider>
          <UserContextProvider>
              {children}
          </UserContextProvider>
      </ThemeContextProvider>
    )
  }