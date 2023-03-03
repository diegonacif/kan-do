import { Rows } from "phosphor-react"
import '../../css/App.css';

export const BoardSelector = () => {
  return (
    <div className="board-selector-container selected">
      <Rows size={18} weight="duotone" />
      <span>Platform Launch</span>
    </div>
  )
}