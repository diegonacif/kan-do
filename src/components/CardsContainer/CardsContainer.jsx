import '../../css/App.css';
import { KanCard } from '../KanCard/KanCard';

export const CardsContainer = () => {
  return (
    <div className="cards-container-container">
      <section>
        <div className="dot"></div>
        <div className="cards-wrapper">
          <KanCard />
        </div>
      </section>
    </div>
  )
}