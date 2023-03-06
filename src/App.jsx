import { useState } from 'react';
import { Sidebar, OpenModalButton } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import Rodal from 'rodal';
import './css/App.css';
import 'rodal/lib/rodal.css';

export const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function modalShow() {
    setIsModalVisible(true);
  }

  function modalHide() {
    setIsModalVisible(false);
  }

  function onCloseModal() {
    return (
      modalHide(),
      setRefresh(current => !current)
    )
  }

  const modalCustomStyles = {
    height: '100vh',
    width: '200px',
  }

  return (
    <div className="App">
      <Rodal
        visible={isModalVisible}
        onClose={() => onCloseModal()}
        className='rodal-container'
        id='rodal-dialog'
        animation='slideLeft'
        duration={400}
        showMask={false}
        closeMaskOnClick={false}
        showCloseButton={false}
        customStyles={modalCustomStyles}
      >
        <Sidebar modalHide={modalHide} />
      </Rodal>
      {
        !isModalVisible &&
        <OpenModalButton modalOpen={modalShow} />
      }
      <Header refresh={setRefresh} />
      <CardsContainer refresh={refresh} />
    </div>
  )
}
