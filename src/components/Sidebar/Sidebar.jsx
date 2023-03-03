import '../../css/App.css';
import { BoardSelector } from '../BoardSelector/BoardSelector';

export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <header>
        <h2>Kan-Do</h2>
      </header>
      <main>
        <h5>MEUS QUADROS (8)</h5>
        <BoardSelector />
        <BoardSelector />
        <BoardSelector selected />
        <BoardSelector />
        <BoardSelector />
      </main>
      <button>&lt;</button>
    </div>
  )
}