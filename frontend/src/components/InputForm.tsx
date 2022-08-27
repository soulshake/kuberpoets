import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppValues } from '../AppContext';

function InputForm() {
  const { setAppValues } = useAppValues();
  const [fullBlob, setBlob] = useState('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines: Array<string> = fullBlob.trim().split('\n');
    setAppValues({
      blob: fullBlob,
      blobs: lines,
    });
  };

  return (
    <div className='container'>
      <form onSubmit={submitForm}>
        <TextField
          className='input'
          id='user-input'
          label='Enter some text'
          multiline
          onChange={e => setBlob(e.target.value)}
          type='text'
          value={fullBlob}
          variant='outlined'
        />
        <div>
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
