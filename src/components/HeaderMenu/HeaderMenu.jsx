import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { LightModeContext } from "../../contexts/LightModeProvider";
import { SelectedBoardContext } from "../../contexts/SelectedBoardProvider";

import "../../css/App.css";

export const HeaderMenu = () => {
  // Email Context
  const { logoutUser, isSignedIn } = useContext(AuthEmailContext);
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const { setSelectedBoard, setSelectedBoardName } = useContext(SelectedBoardContext); // Selected Board Context

  function handleLogoutUser() {
    logoutUser();
    setSelectedBoard('');
    setSelectedBoardName('');
  }

  return (
    <div className={`header-menu-container ${isLightMode && 'light-mode'}`}>
      <SignOut size={28} weight="duotone" />
      <span onClick={() => handleLogoutUser()}>Logout</span>
    </div>
  )
}