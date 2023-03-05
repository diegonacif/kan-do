import { Moon, Sun } from "phosphor-react"
import { useContext } from "react"
import { LightModeContext } from "../../contexts/LightModeProvider"

import '../../css/App.css';

export const LightModeButton = () => {
  // Light Mode Context
  const {
    isLightMode,
    setIsLightMode
  } = useContext(LightModeContext);
  return (
    <div className="light-mode-button-container">
      {
        !isLightMode ?
        <Moon size={36} weight="fill" /> :
        <Sun size={36} weight="fill" />
      }
    </div>
  )
}