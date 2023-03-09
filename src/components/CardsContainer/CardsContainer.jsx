import { useContext, useEffect, useState } from 'react';
import { KanCard } from '../KanCard/KanCard';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { SelectedBoardContext } from "../../contexts/SelectedBoardProvider";
import { Circle } from 'phosphor-react';
import { db } from '../../services/firebase-config';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import { EditTask } from '../EditTask/EditTask';
import { ToastifyContext } from '../../contexts/ToastifyProvider';
import Rodal from 'rodal';
import '../../css/App.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const CardsContainer = ({ refresh }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const { notifySuccess } = useContext(ToastifyContext); // Toastify Context
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const { selectedBoard } = useContext(SelectedBoardContext); // Selected Board Context
  const [cardsRaw, setCardsRaw] = useState();
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [editTaskShow, setEditTaskShow] = useState(false);
  const cardsCollectionRef = collection(db, `${user?.uid}`, selectedBoard, 'tasks');

  const [editCard, setEditCard] = useState('');
  const [status, setStatus] = useState('');
  const [taskContent, setTaskContent] = useState('');

  // Users Data
  useEffect(() => {
    const getCardsData = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCardsRaw(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCardsData();
  }, [refresh, localRefresh, selectedBoard])

  // Update Card
  const updateCard = async (cardId) => {
    const docRef = doc(db, `${user?.uid}`, selectedBoard, 'tasks', cardId)

    await updateDoc(docRef, {
      status: status,
      taskContent: taskContent
    })
    .then(() => {
      setLocalRefresh(current => !current);
      setEditTaskShow(false);
      notifySuccess('A tarefa foi atualizada!')
      console.log('Updated card');
    })

  }

  // Delete card
  const deleteCard = async (cardId) => {
    await deleteDoc(doc(cardsCollectionRef, cardId))
    .then(() => {
      setLocalRefresh(current => !current);
      setEditTaskShow(false);
      notifySuccess('A tarefa foi deletada!')
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
    setStatus('A fazer');
    setTaskContent('');
    setLocalRefresh(current => !current);
  }

  // Todo List
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    const cards = cardsRaw?.filter(cards => cards.status === "A fazer");
    setTodoList(cards);
  }, [cardsRaw])

  function handleOnDragEndTodo(result) {
    if(!result.destination) return;
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoList(items)
  }

  // Doing List
  const [doingList, setDoingList] = useState([]);
  useEffect(() => {
    const cards = cardsRaw?.filter(cards => cards.status === "Em andamento");
    setDoingList(cards);
  }, [cardsRaw])

  function handleOnDragEndDoing(result) {
    if(!result.destination) return;
    const items = Array.from(doingList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDoingList(items)
  }

  // Done Cards
  const [doneList, setDoneList] = useState([]);
  useEffect(() => {
    const cards = cardsRaw?.filter(cards => cards.status === "Feito");
    setDoneList(cards);
  }, [cardsRaw])

  function handleOnDragEndDone(result) {
    if(!result.destination) return;
    const items = Array.from(doneList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDoneList(items)
  }
  
  return (
    <div className={`cards-container-container ${isLightMode && 'light-mode'}`}>
      <div className="cards-container-wrapper">
        <DragDropContext onDragEnd={handleOnDragEndTodo}>
          <section>
            <div className="section-title">
              <div className="section-title-content" id="title-todo">
                <Circle size={13} color="#f1e585" weight="fill" />
                <span>À FAZER ({todoList?.length})</span>
              </div>
            </div>
            <Droppable droppableId="todo-droppable">
              {(provided) => (
                <div 
                  className="cards-wrapper" 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  {
                    firestoreLoading ?
                    null :
                    todoList?.map((card, index) => {
                      return (
                        <Draggable key={`div-${card.id}`} draggableId={`div-${card.id}`} index={index} >
                          {(provided) => (
                            <div 
                              onClick={() => handleOpenEditTask(card)}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <KanCard 
                                key={card.id}
                                status={card.status}
                                taskContent={card.taskContent}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    })
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </section>
        </DragDropContext>
        <DragDropContext onDragEnd={handleOnDragEndDoing}>
          <section>
            <div className="section-title">
              <div className="section-title-content" id="title-doing">
                <Circle size={13} color="#12a9ca" weight="fill" />
                <span>FAZENDO ({doingList?.length})</span>
              </div>
            </div>
            <Droppable droppableId="doing-droppable">
              {(provided) => (
              <div 
                className="cards-wrapper"
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {
                  firestoreLoading ?
                  null :
                  doingList?.map((card, index) => {
                    return (
                      <Draggable key={`div-${card.id}`} draggableId={`div-${card.id}`} index={index} >
                        {(provided) => (
                          <div 
                            onClick={() => handleOpenEditTask(card)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <KanCard 
                              key={card.id}
                              status={card.status}
                              taskContent={card.taskContent}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </div>
              )}
            </Droppable>
          </section>
        </DragDropContext>
        <DragDropContext onDragEnd={handleOnDragEndDone}>
          <section>
            <div className="section-title">
              <div className="section-title-content" id="title-done">
                <Circle size={13} color="#26b89f" weight="fill" />
                <span>FEITO ({doneList?.length})</span>
              </div>
            </div>
            <Droppable droppableId="done-droppable">
            {(provided) => (
              <div 
                className="cards-wrapper"
                {...provided.droppableProps} 
                ref={provided.innerRef}
              >
                {
                  firestoreLoading ?
                  null :
                  doneList?.map((card, index) => {
                    return (
                      <Draggable key={`div-${card.id}`} draggableId={`div-${card.id}`} index={index} >
                        {(provided) => (
                          <div 
                            onClick={() => handleOpenEditTask(card)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <KanCard 
                              key={card.id}
                              status={card.status}
                              taskContent={card.taskContent}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
              </div>
            )}
            </Droppable>
          </section>
        </DragDropContext>
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
        <EditTask 
          card={editCard} 
          deleteCard={deleteCard} 
          currentStatus={setStatus}
          currentTaskContent={setTaskContent}
          updateCard={updateCard}
        />
      </Rodal>
    </div>
  )
}