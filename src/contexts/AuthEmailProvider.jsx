import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
  } from 'firebase/auth'
import { auth } from '../services/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastifyContext } from "./ToastifyProvider";
import { SelectedBoardContext } from "./SelectedBoardProvider";

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginReset, setLoginReset] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { notifySuccess, notifyError } = useContext(ToastifyContext); // Toastify Context

  const [userState, loading, error] = useAuthState(auth);


  onAuthStateChanged(auth, (currentUser) => {
    if (loading) {
      // console.log("loading user state")
      setIsLoading(true);
    } else {
      setUser(currentUser);
      setIsSignedIn(!!currentUser);
      setIsLoading(false);
    }
  })

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
      );
      console.log(user);
      notifySuccess('Usuário registrado com sucesso!')
    } catch (error) {
      console.log(error.message);
      notifyError('Erro ao registrar')
    }
  }
  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      console.log("logged in");
      notifySuccess('Você está logado!');
    } catch (error) {
      console.log(error.message);
      notifyError(`${error.message}`)
    }
  }
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log(user);
      notifySuccess('Você está deslogado!')
    } catch (error) {
      console.error(error.message);
      notifyError(`${error.message}`)
    }
  }

  const passwordReset = async () => {
    sendPasswordResetEmail(auth, loginReset)
      .then(() => {
        console.log("password reset sent");
        notifySuccess('Reset enviado para seu email!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ "errorCode": errorCode, "errorMessage": errorMessage });
        notifyError(`${error.message}`)
      });
  }

  return (
    <AuthEmailContext.Provider value={{ 
      registerEmail, 
      setRegisterEmail, 
      registerPassword, 
      setRegisterPassword,
      setLoginEmail,
      setLoginPassword,
      setLoginReset,
      registerUser,
      loginUser,
      logoutUser,
      passwordReset,
      isSignedIn,
      errorMsg,
      isLoading,
      user
    }}>
      {children}
    </AuthEmailContext.Provider>
  )
}