import { DotsThreeOutlineVertical } from "phosphor-react"
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
// import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { useContext } from "react";

import '../../css/App.css';

export const Header = () => {
  

  return (
    <div className="header-container">
      <h3>Nome do quadro</h3>
      <section>
        <button>Adicionar nova tarefa</button>
        <DotsThreeOutlineVertical size={20} weight="fill" />
      </section>
      <HeaderMenu />
    </div>
  )
}