import { useContext } from "react";
import { LightModeContext } from "../../contexts/LightModeProvider";
import "../../css/App.css";

export const KanCard = () => {
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`kan-card-container ${isLightMode && 'light-mode'}`}>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cupiditate tempora sed consequatur modi quod non iure rerum fuga. Cumque repellat reprehenderit nam cupiditate eveniet! Esse reiciendis natus aliquid sed?</span>
    </div>
  )
}
