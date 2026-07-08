import { Route, Routes } from 'react-router-dom';
import AiModal from '../AiModal/AiModal.tsx';
import Alphabet from '../Alphabet/Alphabet.tsx';
import ConfirmModal from '../ConfirmModal/ConfirmModal.tsx';
import DaysMonths from '../DaysMonths/DaysMonths.tsx';
import DictLoadingModal from '../DictLoadingModal/DictLoadingModal.tsx';
import FlashCards from '../FlashCards/FlashCards.tsx';
import Home from '../Home/Home.tsx';
import MenuBar from '../MenuBar/MenuBar.tsx';
import Numbers from '../Numbers/Numbers.tsx';
import SearchBox from '../SearchBox/SearchBox.tsx';
import SubNav from '../SubNav/SubNav.tsx';
import WordView from '../WordView/WordView.tsx';
import './app.scss';

const App = () => (
  <div className="app">
    <MenuBar />
    <SubNav />
    <AiModal />
    <main className="app__content">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBox />
              <Home />
            </>
          }
        />
        <Route
          path="/w/:term"
          element={
            <>
              <SearchBox />
              <WordView />
            </>
          }
        />
        <Route path="/flash-cards" element={<FlashCards />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/days-months" element={<DaysMonths />} />
      </Routes>
    </main>
    <ConfirmModal />
    <DictLoadingModal />
  </div>
);

export default App;
