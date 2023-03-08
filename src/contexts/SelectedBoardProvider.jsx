import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const SelectedBoardContext = createContext();

export const SelectedBoardProvider = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useLocalStorage("selectedBoard", '');
  const [selectedBoardName, setSelectedBoardName] = useLocalStorage("selectedBoardName", '');

  return (
    <SelectedBoardContext.Provider value={{ 
      selectedBoard,
      setSelectedBoard,
      selectedBoardName,
      setSelectedBoardName
    }}>
      {children}
    </SelectedBoardContext.Provider>
  )
}