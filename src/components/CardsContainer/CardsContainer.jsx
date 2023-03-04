import { Circle } from 'phosphor-react';
import '../../css/App.css';
import { KanCard } from '../KanCard/KanCard';

export const CardsContainer = () => {
  return (
    <div className="cards-container-container">
      <section>
        <div className="section-title">
          <Circle size={13} color="#12a9ca" weight="fill" />
          <span>TODO (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
        </div>
      </section>
      <section>
      <div className="section-title">
          <div className="color-dot"></div>
          <span>DOING (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
        </div>
      </section>
      <section>
      <div className="section-title">
          <div className="color-dot"></div>
          <span>DONE (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
        </div>
      </section>
    </div>
  )
}