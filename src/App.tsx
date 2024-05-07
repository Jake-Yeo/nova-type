import './App.css';
import HistoryPage from './Pages/HistoryPage';
import TypingPage from './Pages/TypingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<TypingPage/>}/>
          <Route path='/TypingPage' element={<TypingPage/>}/>
          <Route path='/HistoryPage' element={<HistoryPage/>}/>
          <Route path='*' element={'404 error'}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
