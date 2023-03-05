import { PlusCircle } from "phosphor-react"

export const NewTask = () => {
  return (
    <div className="new-task-container">
      <header>
        <h1>Nova tarefa</h1>
        <PlusCircle size={36} weight="duotone" />
      </header>
      <textarea name="taks" id="task" rows="5" placeholder="Digite sua tarefa aqui"></textarea>
      <select name="status" id="status">
        <option value="A fazer">A fazer</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Feito">Feito</option>
      </select>
    </div>
  )
}