import { useEffect, useState } from "react";
import { CloudArrowUp, MinusCircle, Trash } from "phosphor-react"

import '../../css/App.css';

export const EditTask = ({ 
  card, 
  deleteCard, 
  updateCard,
  currentStatus, 
  currentTaskContent 
}) => {

  const [status, setStatus] = useState('');
  const [taskContent, setTaskContent] = useState('');

  useEffect(() => {
    currentStatus(status);
    currentTaskContent(taskContent);
  }, [status, taskContent])

  useEffect(() => {
    setStatus(card.status);
    setTaskContent(card.taskContent);
  }, [card])

  const [editTaskAllowed, setEditTaskAllowed] = useState(false);
  useEffect(() => {
    taskContent?.length < 1 ? setEditTaskAllowed(false) : setEditTaskAllowed(true);
  }, [taskContent])

  return (
    <div className="edit-task-container">
      <header>
        <h1>Editar tarefa</h1>
        <div className="action-buttons">
          <Trash size={36} weight="duotone" onClick={() => deleteCard(card.id)} />
          {
            editTaskAllowed ?
            <CloudArrowUp size={36} weight="fill" onClick={() => updateCard(card.id)} /> :
            <CloudArrowUp size={36} weight="duotone" />
          }
        </div>
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