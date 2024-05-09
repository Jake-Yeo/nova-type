import { useContext } from 'react';
import './App.css';
import { TypingDataContext } from './components/TypeFeedAreaDisplay';
import HistoryPage from './Pages/HistoryPage';
import TypingPage from './Pages/TypingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupLoginPage from './Pages/SignupLoginPage';



function App() {

  const typingData = useContext(TypingDataContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<TypingPage />} />
          <Route path='/TypingPage' element={<TypingPage />} />
          {/* We need to pass down typingData to the history page because it needs to update when new info comes in */}
          <Route path='/HistoryPage' element={
            <TypingDataContext.Provider value={typingData}>
              <HistoryPage />
            </TypingDataContext.Provider>} />
            <Route path='/SignupLoginPage' element={<SignupLoginPage/>}/>
          <Route path='*' element={'404 error'} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
