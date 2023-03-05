import { useContext } from "react";
import { LightModeContext } from "../../contexts/LightModeProvider";
import { Rows } from "phosphor-react"
import '../../css/App.css';

export const BoardSelector = ({ selected }) => {
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`board-selector-container ${selected && 'selected'} ${isLightMode && 'light-mode'}`}>
      <Rows size={18} weight="duotone" />
      <span>Platform Launch</span>
    </div>
  )
}