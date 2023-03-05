import { useContext } from 'react';
import { KanCard } from '../KanCard/KanCard';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { Circle } from 'phosphor-react';
import '../../css/App.css';

export const CardsContainer = () => {
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  
  return (
    <div className={`cards-container-container ${isLightMode && 'light-mode'}`}>
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