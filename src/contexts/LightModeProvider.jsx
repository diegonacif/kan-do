import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const LightModeContext = createContext();

export const LightModeProvider = ({ children }) => {
  // const [isLightMode, setIsLightMode] = useState(false);
  const [isLightMode, setIsLightMode] = useLocalStorage("isLightMode", false)



  return (
    <LightModeContext.Provider value={{ 
      isLightMode,
      setIsLightMode
    }}>
      {children}
    </LightModeContext.Provider>
  )
}