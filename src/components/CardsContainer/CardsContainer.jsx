import { useContext, useEffect, useState } from 'react';
import { KanCard } from '../KanCard/KanCard';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { Circle } from 'phosphor-react';
import { db } from '../../services/firebase-config';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import Rodal from 'rodal';
import { EditTask } from '../EditTask/EditTask';
import '../../css/App.css';

export const CardsContainer = ({ refresh }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const [cardsRaw, setCardsRaw] = useState();
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [editTaskShow, setEditTaskShow] = useState(false);
  const cardsCollectionRef = collection(db, `${user?.uid}`);

  const [editCard, setEditCard] = useState('');

  // console.log(editCard);

  // Users Data
  useEffect(() => {
    const getCardsData = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCardsRaw(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCardsData();
  }, [refresh, localRefresh])

  // Delete card
  const deleteCard = async (cardId) => {
    await deleteDoc(doc(cardsCollectionRef, cardId))
    .then(() => {
      setLocalRefresh(current => !current);
      setEditTaskShow(false);
      console.log('Deleted card');
    })
  }

  // Firestore loading
  const [value, loading, error] = useCollection(cardsCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])

  const modalCustomStyles = {
    height: 'fit-content',
    width: 'fit-content',
  }

  function handleOpenEditTask(card) {
    setEditTaskShow(true);
    setEditCard(card)
  }
  function handleCloseEditTask() {
    setEditTaskShow(false);
    setLocalRefresh(current => !current);
  }
  
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
                  <div 
                    key={`div-${card.id}`}
                    onClick={() => handleOpenEditTask(card)}
                  >
                    <KanCard 
                      key={card.id}
                      status={card.status}
                      taskContent={card.taskContent}
                    />
                  </div>
                )
              })
            }
          </div>
        </section>
        <section>
          <div className="section-title">
            <Circle size={13} color="#12a9ca" weight="fill" />
            <span>DOING (4)</span>
          </div>
          <div className="cards-wrapper">
          </div>
        </section>
        <section>
          <div className="section-title">
            <Circle size={13} color="#26b89f" weight="fill" />
            <span>DONE (4)</span>
          </div>
          <div className="cards-wrapper">
          </div>
        </section>
      </div>
      <Rodal
        visible={editTaskShow}
        onClose={() => handleCloseEditTask()}
        className='rodal-container'
        id='rodal-edit-task'
        animation='zoom'
        duration={300}
        showMask={true}
        closeMaskOnClick={true}
        showCloseButton={false}
        closeOnEsc={true}
        customStyles={modalCustomStyles}
      >
        <EditTask card={editCard} deleteCard={deleteCard} />
      </Rodal>
    </div>
  )
}