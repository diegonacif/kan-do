import { useContext } from "react";
import { LightModeContext } from "../../contexts/LightModeProvider";
import "../../css/App.css";

export const KanCard = ({ status, taskContent }) => {
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`kan-card-container ${isLightMode && 'light-mode'}`}>
      <span>{taskContent}</span>
    </div>
  )
}
