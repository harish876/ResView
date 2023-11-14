import { useState } from 'react';
import Navbar from './Components/Shared/Navbar';
import './Styles/App.css';
import { ThemeContext, ThemeProvider } from './Context';


const PreSynthApp = () => {
  return (
    <div className='App'>
      <Navbar />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </div>
  );
}

function App(){
  return (
      <ThemeProvider>
        <PreSynthApp />
      </ThemeProvider>
  );
};

export default App;
