import { useContext, useState } from "react";
import { DotsThreeOutlineVertical } from "phosphor-react"
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import { LightModeContext } from '../../contexts/LightModeProvider';
import Rodal from 'rodal';

import '../../css/App.css';
import { NewTask } from "../NewTask/NewTask";

export const Header = ({ refresh }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [newTaskShow, setNewTaskShow] = useState(false);
  const { isLightMode } = useContext(LightModeContext); // Light Mode Context

  function handleMenuShow() { setIsMenuVisible(true); }
  function handleModalHide() { setIsMenuVisible(false); }

  function handleOpenNewTask() { setNewTaskShow(true); }
  function handleCloseNewTask() { 
    return (
      setNewTaskShow(false),
      refresh(current => !current)
    )
  }

  const modalCustomStyles = {
    height: 'fit-content',
    width: 'fit-content',
  }

  return (
    <div className={`header-container ${isLightMode && 'light-mode'}`}>
      <h3>Nome do quadro</h3>
      <section>
        <button onClick={() => handleOpenNewTask()}>Adicionar nova tarefa</button>
        <DotsThreeOutlineVertical
          size={20} 
          weight="fill" 
          onClick={() => handleMenuShow()}
        />
      </section>
      <Rodal
        visible={isMenuVisible}
        onClose={() => handleModalHide()}
        className='rodal-container'
        id='rodal-dialog'
        animation='slideRight'
        duration={400}
        showMask={true}
        closeMaskOnClick={true}
        showCloseButton={false}
        closeOnEsc={true}
        customStyles={modalCustomStyles}
      >
        <HeaderMenu />
      </Rodal>
      <Rodal
        visible={newTaskShow}
        onClose={() => handleCloseNewTask()}
        className='rodal-container'
        id='rodal-new-task'
        animation='zoom'
        duration={300}
        showMask={true}
        closeMaskOnClick={true}
        showCloseButton={false}
        closeOnEsc={true}
        customStyles={modalCustomStyles}
      >
        <NewTask handleClose={handleCloseNewTask} />
      </Rodal>
    </div>
  )
}