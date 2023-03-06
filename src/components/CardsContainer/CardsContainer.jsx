import { useContext, useEffect, useState } from 'react';
import { KanCard } from '../KanCard/KanCard';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { Circle } from 'phosphor-react';
import { db } from '../../services/firebase-config';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { collection, getDocs } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import '../../css/App.css';

export const CardsContainer = ({ refresh }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const [cardsRaw, setCardsRaw] = useState();
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const cardsCollectionRef = collection(db, `${user?.uid}`);

  console.log(refresh);

  // Users Data
  useEffect(() => {
    const getCardsData = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCardsRaw(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCardsData();
  }, [refresh])

  // Firestore loading
  const [value, loading, error] = useCollection(cardsCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])
  
  return (
    <div className={`cards-container-container ${isLightMode && 'light-mode'}`}>
      <div className="cards-container-wrapper">
        <section>
          <div className="section-title">
            <Circle size={13} color="#f1e585" weight="fill" />
            <span>TODO (4)</span>
          </div>
          <div className="cards-wrapper">
            {
              firestoreLoading ?
              null :
              cardsRaw?.map((card) => {
                return (
                  <KanCard 
                    key={card.id}
                    status={card.status}
                    taskContent={card.taskContent}
                  />
                )
              })
            }
            {/* <KanCard />
            <KanCard />
            <KanCard /> */}
          </div>
        </section>
        <section>
          <div className="section-title">
            <Circle size={13} color="#12a9ca" weight="fill" />
            <span>DOING (4)</span>
          </div>
          <div className="cards-wrapper">
            {/* <KanCard />
            <KanCard /> */}
          </div>
        </section>
        <section>
          <div className="section-title">
            <Circle size={13} color="#26b89f" weight="fill" />
            <span>DONE (4)</span>
          </div>
          <div className="cards-wrapper">
            {/* <KanCard />
            <KanCard />
            <KanCard />
            <KanCard /> */}
          </div>
        </section>
      </div>
    </div>
  )
}