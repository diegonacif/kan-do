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

  function handleLightModeToggle() {
    setIsLightMode(current => !current)
  }
  return (
    <div className="light-mode-button-container">
      {
        !isLightMode ?
        <Moon size={28} weight="duotone" onClick={() => handleLightModeToggle()} /> :
        <Sun size={28} weight="duotone" onClick={() => handleLightModeToggle()}/>
      }
    </div>
  )
}