import { Rows } from "phosphor-react"
import '../../css/App.css';

export const BoardSelector = ({ selected }) => {
  return (
    <div className={`board-selector-container ${selected && 'selected'}`}>
      <Rows size={18} weight="duotone" />
      <span>Platform Launch</span>
    </div>
  )
}