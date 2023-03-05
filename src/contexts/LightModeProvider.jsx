import { createContext, useEffect, useState } from "react";

export const LightModeContext = createContext();

export const LightModeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <LightModeContext.Provider value={{ 
      isLightMode,
      setIsLightMode
    }}>
      {children}
    </LightModeContext.Provider>
  )
}