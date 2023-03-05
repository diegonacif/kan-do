import '../../css/App.css';
import { BoardSelector } from '../BoardSelector/BoardSelector';
import { LightModeButton } from '../LightModeButton/LightModeButton';

export const Sidebar = ({ modalHide }) => {
  return (
    <div className="sidebar-container">
      <header>
        <h2>Kan-Do</h2>
        <LightModeButton />
      </header>
      <main>
        <h5>MEUS QUADROS (8)</h5>
        <BoardSelector />
        <BoardSelector />
        <BoardSelector selected />
        <BoardSelector />
        <BoardSelector />
      </main>
      <button onClick={() => modalHide()}>&lt;</button>
    </div>
  )
}

export const OpenModalButton = ({ modalOpen }) => {
  return (
    <div className="open-modal-button-container">
      <button onClick={() => modalOpen()}>&gt;</button>
    </div>
  )
}