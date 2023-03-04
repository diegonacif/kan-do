import { useContext } from "react";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";

import "../../css/App.css";

export const HeaderMenu = () => {
  const { 
    logoutUser,
    isSignedIn,
  } = useContext(AuthEmailContext);

  return (
    <div className="header-menu-container">
      <span onClick={() => logoutUser()}>Logout</span>
    </div>
  )
}