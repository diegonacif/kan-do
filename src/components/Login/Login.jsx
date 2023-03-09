import { Eye, EyeSlash, LockKeyOpen, UserCircle, XCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { LightModeContext } from "../../contexts/LightModeProvider";
import { LightModeButton } from '../../components/LightModeButton/LightModeButton';
import "../../css/App.css";
import { ToastContainer } from "react-toastify";

export const Login = () => {

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const navigate = useNavigate();

  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  
  // Hook Form Controller
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });

  // Email Context
  const { 
    setLoginEmail,
    setLoginPassword,
    setLoginReset,
    setRegisterEmail,
    setRegisterPassword,
    registerUser,
    loginUser,
    logoutUser,
    isSignedIn,
    passwordReset,
    errorMsg
  } = useContext(AuthEmailContext);

  // Back to main page when logged in
  useEffect(() => {
    isSignedIn ? navigate("/home") : null;
  }, [isSignedIn])

  // Inputs data going to auth context
  useEffect(() => {
    setLoginEmail(watch("email"));
    setLoginPassword(watch("password"));
    setLoginReset(watch("emailReset"));
    setRegisterEmail(watch("registerEmail"));
    setRegisterPassword(watch("registerPassword"));

  }, [watch()]);

  // Reset State
  function handleResetState(mode) {
    setValue("email", "");
    setValue("emailReset", "");
    setValue("password", "");
    setValue("registerEmail", "");
    setValue("registerPassword", "");
    setValue("confirmRegisterPassword", "");

    if (mode === "forgotPassword") {
      setLoginMode("forgotPassword");
    } else if (mode === "register") {
      setLoginMode("register");
    } else if (mode === "login") {
      setLoginMode("login");
    } else {
      console.log("Invalid mode");
    }
  }

  // Handle functions
  function handleRegister() {
    registerUser();
    handleResetState("login");
  }
  function handleForgotPassword() {
    passwordReset();
    handleResetState("login");
  }
  function handleLogin() {
    loginUser();
    handleResetState("login");
  }
  function handleXButton () {
    if(loginMode === "login") {
      return navigate("/");
    } else if (loginMode === "forgotPassword" || loginMode === "register") {
      return handleResetState("login");
    } else {
      return;
    }
  }

  // Buttons validation
  const [isConfirmButtonAllowed, setIsConfirmButtonAllowed] = useState(false);
  useEffect(() => {
    if(watch('email').length < 6 || watch('password').length < 6) {
      return setIsConfirmButtonAllowed(false)
    } else {
      return setIsConfirmButtonAllowed(true)
    }
  }, [watch()])
  const [isSendButtonAllowed, setIsSendButtonAllowed] = useState(false);
  useEffect(() => {
    if(watch('emailReset')?.length < 6) {
      return setIsSendButtonAllowed(false)
    } else {
      return setIsSendButtonAllowed(true)
    }
  }, [watch()])
  const [isRegisterButtonAllowed, setIsRegisterButtonAllowed] = useState(false);
  useEffect(() => {
    if(watch('registerEmail')?.length < 12 || watch('registerPassword')?.length < 6 || watch('confirmRegisterPassword') !== watch('registerPassword')) {
      return setIsRegisterButtonAllowed(false)
    } else {
      return setIsRegisterButtonAllowed(true)
    }
  }, [watch()])

  return (
    <div className={`login-container ${isLightMode && 'light-mode'}`}>
      <header>
        <Link to="/">
          <span>Kan-Do</span>
        </Link>
        {
          loginMode === "login" &&
          <div id="light-button">
            <LightModeButton />
          </div>
        }
        {
          loginMode !== "login" &&
          <XCircle 
            size={32} 
            // color="#1cbdc8" 
            weight="duotone" id="close-button" 
            onClick={() => handleXButton()} 
          />
        }
      </header>
      <section className="login-wrapper">
        {
          loginMode === "login" ?
          // Login Mode
          <>
            <h3>Faça login para continuar</h3>
            <div className="input-wrapper">
              <div className="input-row">
                <UserCircle size={28} weight="duotone" className="login-icons" />
                <input 
                  type="text" 
                  placeholder="E-mail" 
                  {...register("email")}
                />
              </div>
              <div className="input-row">
                <LockKeyOpen size={28} weight="duotone" className="login-icons" />
                <input 
                  type={isPasswordShown ? "text" : "password"} 
                  placeholder="Senha" 
                  {...register("password")}
                />
                {
                  isPasswordShown ?
                  <Eye 
                    size={24} 
                    weight="duotone" 
                    className="password-eye-icon" 
                    onClick={() => setIsPasswordShown(false)}
                  /> :
                  <EyeSlash 
                    size={24} 
                    weight="duotone" 
                    className="password-eye-icon" 
                    onClick={() => setIsPasswordShown(true)}
                  />
                }
              </div>
            </div>
            <span id="forgot-password" onClick={() => handleResetState("forgotPassword")}>Esqueci a senha</span>
            <span id="register" onClick={() => handleResetState("register")}>Cadastrar-se agora</span>
            <button 
              onClick={() => handleLogin()} 
              disabled={isConfirmButtonAllowed ? "" : "disabled"}
            >
              Confirmar
            </button>
          </> :
          loginMode === "forgotPassword" ?
          // Forgot Password Mode
          <>
            <h3>Insira seu e-mail e clique em Enviar</h3>
            <div className="input-wrapper">
              <div className="input-row">
                <UserCircle size={28} weight="duotone" className="login-icons" />
                <input 
                  type="text" 
                  placeholder="E-mail" 
                  {...register("emailReset")}
                />
              </div>
              
            </div>
            <button 
              onClick={() => handleForgotPassword()}
              disabled={isSendButtonAllowed ? "" : "disabled"}
            >
              Enviar
            </button>
          </> :
          loginMode === "register" ?
          // Register Mode
          <>
            <h3>Faça seu registro</h3>
            <div className="input-wrapper">
              <div className="input-row">
                <UserCircle size={28} weight="duotone" className="login-icons" />
                <input 
                  type="text" 
                  placeholder="E-mail" 
                  {...register("registerEmail")}
                />
              </div>
              <div className="input-row">
                <LockKeyOpen size={28} weight="duotone" className="login-icons" />
                <input 
                  type={isPasswordShown ? "text" : "password"} 
                  placeholder="Senha" 
                  {...register("registerPassword")}
                />
                {
                  isPasswordShown ?
                  <Eye 
                    size={24} 
                    weight="duotone" 
                    className="password-eye-icon" 
                    onClick={() => setIsPasswordShown(false)}
                  /> :
                  <EyeSlash 
                    size={24} 
                    weight="duotone" 
                    className="password-eye-icon" 
                    onClick={() => setIsPasswordShown(true)}
                  />
                }
              </div>
              <div className="input-row">
                <LockKeyOpen size={28} weight="duotone" className="login-icons" />
                <input 
                  type={isPasswordShown ? "text" : "password"} 
                  placeholder="Confirme a senha" 
                  {...register("confirmRegisterPassword")}
                />
              </div>
            </div>
            <button 
              onClick={() => handleRegister()}
              disabled={isRegisterButtonAllowed ? "" : "disabled"}
            >
              Registrar-se
            </button>
          </> :
          null
        }
      </section>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}