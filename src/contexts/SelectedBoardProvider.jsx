import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const SelectedBoardContext = createContext();

export const SelectedBoardProvider = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useLocalStorage("selectedBoard", '')

  return (
    <SelectedBoardContext.Provider value={{ 
      selectedBoard,
      setSelectedBoard
    }}>
      {children}
    </SelectedBoardContext.Provider>
  )
}