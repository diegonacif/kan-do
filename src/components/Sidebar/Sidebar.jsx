import { useContext } from 'react';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { BoardSelector } from '../BoardSelector/BoardSelector';
import { LightModeButton } from '../LightModeButton/LightModeButton';
import '../../css/App.css';

export const Sidebar = ({ modalHide }) => {
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`sidebar-container ${isLightMode && 'light-mode'}`}>
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
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  return (
    <div className={`open-modal-button-container ${isLightMode && 'light-mode'}`}>
      <button onClick={() => modalOpen()}>&gt;</button>
    </div>
  )
}