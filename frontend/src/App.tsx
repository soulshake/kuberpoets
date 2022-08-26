import React from 'react';
import './App.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Enter some text below.</p>

        <InputForm />
      </header>
    </div>
  );
}

export default App;
