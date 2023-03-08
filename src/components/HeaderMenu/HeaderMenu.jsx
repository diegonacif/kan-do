import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { LightModeContext } from "../../contexts/LightModeProvider";
import { ToastifyContext } from "../../contexts/ToastifyProvider";

import "../../css/App.css";

export const HeaderMenu = () => {
  // Email Context
  const { logoutUser, isSignedIn } = useContext(AuthEmailContext);
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`header-menu-container ${isLightMode && 'light-mode'}`}>
      <SignOut size={28} weight="duotone" />
      <span onClick={() => logoutUser()}>Logout</span>
    </div>
  )
}