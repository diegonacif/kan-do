import { DotsThreeOutlineVertical } from "phosphor-react"
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import Rodal from 'rodal';

import '../../css/App.css';
import { useState } from "react";

export const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function modalShow() {
    setIsModalVisible(true);
  }

  function modalHide() {
    setIsModalVisible(false);
  }

  const modalCustomStyles = {
    height: 'fit-content',
    width: 'fit-content',
  }

  return (
    <div className="header-container">
      <h3>Nome do quadro</h3>
      <section>
        <button>Adicionar nova tarefa</button>
        <DotsThreeOutlineVertical
          size={20} 
          weight="fill" 
          onClick={() => modalShow()}
        />
      </section>
      <Rodal
        visible={isModalVisible}
        onClose={() => modalHide()}
        className='rodal-container'
        id='rodal-dialog'
        animation='slideRight'
        duration={400}
        showMask={true}
        closeMaskOnClick={true}
        showCloseButton={false}
        customStyles={modalCustomStyles}
      >
        <HeaderMenu />
      </Rodal>
    </div>
  )
}