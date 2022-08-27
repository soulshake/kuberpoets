import React from 'react';
import './App.css';
import InputForm from './components/InputForm';
import { ResultList } from './components/Result';

import { AppProvider } from './AppContext';

// export const App = () => (
function App() {
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
}

export default App;
