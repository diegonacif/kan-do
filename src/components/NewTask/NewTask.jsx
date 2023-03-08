import { doc, setDoc } from "firebase/firestore";
import { PlusCircle } from "phosphor-react"
import { useContext, useEffect, useState } from "react";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { db } from "../../services/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import { ToastifyContext } from "../../contexts/ToastifyProvider";
import { SelectedBoardContext } from "../../contexts/SelectedBoardProvider";

export const NewTask = ({ handleClose }) => {
  const { user } = useContext(AuthEmailContext); // Email Context
  const { notifySuccess } = useContext(ToastifyContext); // Toastify Context
  const { selectedBoard, setSelectedBoard } = useContext(SelectedBoardContext); // Selected Board Context
  
  const [status, setStatus] = useState('A fazer');
  const [taskContent, setTaskContent] = useState('');

  // New task handler
  async function handleSubmit() {
    const docRef = doc(db, `${user?.uid}`, selectedBoard, 'tasks', `${uuidv4()}`);
    await setDoc(docRef, { status: status, taskContent: taskContent })
    .then(() => {
      console.log(`Deu bom`);
      setStatus('A fazer');
      setTaskContent('');
      handleClose();
      notifySuccess('Tarefa criada com sucesso!');
    });
  }

  return (
    <div className="new-task-container">
      <header>
        <h1>Nova tarefa</h1>
        <PlusCircle size={36} weight="duotone" onClick={() => handleSubmit()} />
      </header>
      <textarea 
        name="taks" 
        id="task" 
        rows="5" 
        placeholder="Digite sua tarefa aqui" 
        onChange={(e) => setTaskContent(e.target.value)}
        value={taskContent}
      />
      <select 
        name="status" 
        id="status" 
        defaultValue="A fazer"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
      >
        <option value="A fazer">A fazer</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Feito">Feito</option>
      </select>
    </div>
  )
}