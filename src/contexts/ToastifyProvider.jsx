import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ToastifyContext = createContext();

export const ToastifyProvider = ({ children }) => {

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <ToastifyContext.Provider value={{ 
      notifySuccess,
      notifyError
    }}>
      {children}
    </ToastifyContext.Provider>
  )
}