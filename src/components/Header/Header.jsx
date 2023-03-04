import { DotsThreeOutlineVertical } from "phosphor-react"

export const Header = () => {
  return (
    <div className="header-container">
      <h3>Nome do quadro</h3>
      <section>
        <button>Adicionar nova tarefa</button>
        <DotsThreeOutlineVertical size={20} weight="fill" />
      </section>
    </div>
  )
}