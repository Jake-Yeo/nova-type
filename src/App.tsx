import { useContext, useEffect } from 'react';
import './App.css';
import { TypingDataContext } from './components/TypeFeedAreaDisplay';
import HistoryPage from './Pages/HistoryPage';
import TypingPage from './Pages/TypingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupLoginPage from './Pages/SignupLoginPage';
import Backend, { initializeOnSignupOrLogin, isUserLoggedIn } from './functions/Backend';
import firebase from 'firebase/compat';
import LoadingPage from './Pages/LoadingPage';
import HomePage from './Pages/HomePage';
import { Typography } from '@mui/material';

function App() {

  const typingData = useContext(TypingDataContext);
  
  return (
    <>
      <BrowserRouter>
      <Backend></Backend>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/TypingPage' element={<TypingPage />} />
          {/* We need to pass down typingData to the history page because it needs to update when new info comes in */}
          <Route path='/HistoryPage' element={
            <TypingDataContext.Provider value={typingData}>
              <HistoryPage />
            </TypingDataContext.Provider>} />
          <Route path='/SignupLoginPage' element={<SignupLoginPage />} />
          <Route path='/HomePage' element={<HomePage/>}/>
          <Route path='/LoadingPage' element={<LoadingPage/>}></Route>
          <Route path='*' element={<Typography sx={{color: 'white'}}>404 error</Typography>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
