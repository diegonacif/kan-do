import { Circle } from 'phosphor-react';
import '../../css/App.css';
import { KanCard } from '../KanCard/KanCard';

export const CardsContainer = () => {
  return (
    <div className="cards-container-container">
      <section>
        <div className="section-title">
          <Circle size={13} color="#f1e585" weight="fill" />
          <span>TODO (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
          <KanCard />
          <KanCard />
        </div>
      </section>
      <section>
        <div className="section-title">
          <Circle size={13} color="#12a9ca" weight="fill" />
          <span>DOING (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
          <KanCard />
        </div>
      </section>
      <section>
        <div className="section-title">
          <Circle size={13} color="#26b89f" weight="fill" />
          <span>DONE (4)</span>
        </div>
        <div className="cards-wrapper">
          <KanCard />
          <KanCard />
          <KanCard />
          <KanCard />
        </div>
      </section>
    </div>
  )
}