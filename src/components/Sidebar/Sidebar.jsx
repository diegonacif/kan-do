import { useContext, useEffect, useState } from 'react';
import { LightModeContext } from '../../contexts/LightModeProvider';
import { BoardSelector } from '../BoardSelector/BoardSelector';
import { LightModeButton } from '../LightModeButton/LightModeButton';
import '../../css/App.css';
import { db } from '../../services/firebase-config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { useCollection } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';
import { ToastifyContext } from '../../contexts/ToastifyProvider';
import { SelectedBoardContext } from '../../contexts/SelectedBoardProvider';

export const Sidebar = ({ modalHide }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const boardsCollectionRef = collection(db, `${user?.uid}`);
  const { notifySuccess } = useContext(ToastifyContext); // Toastify Context
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context
  const { selectedBoard, setSelectedBoard, setSelectedBoardName } = useContext(SelectedBoardContext); // Selected Board Context
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [newBoardName, setNewBoardName] = useState('');
  const [localRefresh, setLocalRefresh] = useState(false);

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
      console.log('Quadro criado com sucesso!');
      notifySuccess('Quadro criado com sucesso!');
    });
  }

  function handleCurrentBoard(board) {
    setSelectedBoard(board.uid)
    setSelectedBoardName(board.boardName)
  }

  return (
    <div className={`sidebar-container ${isLightMode && 'light-mode'}`}>
      <header>
        <h2>Kan-Do</h2>
        <LightModeButton />
      </header>
      <main>
        <h5>MEUS QUADROS ({rawBoards?.length})</h5>
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
        {/* <BoardSelector selected /> */}
        <div className="new-board-input-wrapper">
          <PlusCircle size={30} weight="fill" onClick={() => handleNewBoard()} />
          <input type="text" onChange={(e) => setNewBoardName(e.target.value)} />
        </div>
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