import React from 'react';
import './App.css';
import InputForm from './components/InputForm';
import { ResultList } from './components/Result';

import { AppProvider } from './AppContext';

declare global {
  interface Window {
    env: {
      VERSION: string;
      API_URL: string;
    };
  }
}

export const App = () => {
  return (
    <AppProvider>
      <div className='App'>
        <header className='App-header'>
          <p>Enter some text below.</p>
          <ResultList />
          <InputForm />
        </header>
      </div>
    </AppProvider>
  );
};

export default App;
