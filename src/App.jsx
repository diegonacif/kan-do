import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import './css/App.css';
import { CardsContainer } from './components/CardsContainer/CardsContainer';

export const App = () => {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      <Header />
      <CardsContainer />
    </div>
  )
}
