import React from 'react';
import logo from './logo.svg';
import TypeArea from './components/TypeArea';
import './App.css';
import TextDisplay from './components/TextDisplay';

function App() {
  let text: string = "Hi type me!";

  return (
     <>
     <TextDisplay textToType={text}/>
     <TypeArea textToType={text}/>
     </>
  );
}

export default App;
