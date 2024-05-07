import './App.css';
import TypingPage from './Pages/TypingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<TypingPage/>}/>
          <Route path='/TypingPage' element={<TypingPage/>}/>
          <Route path='*' element={'404 error'}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
