import { useContext, useEffect, useState } from 'react';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { ToastifyContext } from '../../contexts/ToastifyProvider';
import { SelectedBoardContext } from '../../contexts/SelectedBoardProvider';
import { BoardSelector } from '../BoardSelector/BoardSelector';
import { LightModeButton } from '../LightModeButton/LightModeButton';
import { db } from '../../services/firebase-config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';
import Rodal from 'rodal';
import '../../css/App.css';

export const Sidebar = ({ modalHide }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const { notifySuccess } = useContext(ToastifyContext); // Toastify Context
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const { selectedBoard, setSelectedBoard, setSelectedBoardName } = useContext(SelectedBoardContext); // Selected Board Context
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [newBoardName, setNewBoardName] = useState('');
  const [localRefresh, setLocalRefresh] = useState(false);
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
  const boardsCollectionRef = collection(db, `${user?.uid}`);

  const [rawBoards, setRawBoards] = useState([]);

  // Firestore loading
  const [value, loading, error] = useCollection(boardsCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])

  // Boards Data
  useEffect(() => {
    const getBoardsData = async () => {
      const data = await getDocs(boardsCollectionRef);
      setRawBoards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getBoardsData();
  }, [localRefresh])

  // New Board Handler
  async function handleNewBoard() {
    const uid = `board-${uuidv4()}`
    const docRef = doc(db, `${user?.uid}`, uid);
    await setDoc(docRef, {boardName: newBoardName, uid: uid}).
    then(() => {
      setLocalRefresh(current => !current);
      setIsNewBoardOpen(false);
      setIsNewBoardOpen('');
      console.log('Quadro criado com sucesso!');
      notifySuccess('Quadro criado com sucesso!');
    });
  }

  function handleCurrentBoard(board) {
    setSelectedBoard(board.uid)
    setSelectedBoardName(board.boardName)
  }

  const modalCustomStyles = {
    height: 'fit-content',
    width: 'fit-content',
  }

  return (
    <div className={`sidebar-container ${isLightMode && 'light-mode'}`}>
      <header>
        <h2>Kan-Do</h2>
        <LightModeButton />
      </header>
      <main>
        <div className="main-title-wrapper">
          <h5>MEUS QUADROS ({rawBoards?.length})</h5>
          <div className="new-board-input-wrapper">
            <PlusCircle size={24} weight="duotone" onClick={() => setIsNewBoardOpen(true)} />
          </div>
        </div>
        {
          firestoreLoading ?
          null :
          rawBoards.map((board) => {
            return (
              <div 
                className="board-selector-wrapper" 
                onClick={() => handleCurrentBoard(board)}
                key={`board-selector-${board.uid}`}
              >
                <BoardSelector board={board} selected={board.uid === selectedBoard} />
              </div>
            )
          })
        }
        
      </main>
      <Rodal
        visible={isNewBoardOpen}
        onClose={() => setIsNewBoardOpen(false)}
        className='rodal-container'
        id='rodal-new-board'
        animation='slideUp'
        duration={400}
        showMask={true}
        closeMaskOnClick={true}
        showCloseButton={false}
        closeOnEsc={true}
        customStyles={modalCustomStyles}
      >
        <div className="rodal-row">
          <h3>Criar novo quadro</h3>
          <PlusCircle size={32} weight="fill" onClick={() => handleNewBoard()} />
        </div>
        <input type="text" onChange={(e) => setNewBoardName(e.target.value)} />
      </Rodal>
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