import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import { ResultList } from './components/Result';

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
    <div className='App'>
      <header className='App-header'>Kuberpoets</header>
      <div className='Body'>
        <AppContainer />
      </div>
    </div>
  );
};

function AppContainer() {
  const [submittedBlob, setSubmittedBlob] = useState('');
  return (
    <div>
      {!submittedBlob && <p>Enter some text below.</p>}
      <ResultList submittedBlob={submittedBlob} />
      <InputForm setSubmittedBlob={setSubmittedBlob} />
      <div className='Credits'>
        The source for this repository can be found{' '}
        <a className='App-link' href='https://github.com/soulshake/kuberpoets'>
          on Github
        </a>
        .
      </div>
    </div>
  );
}

export default App;
