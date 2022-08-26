import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Input {}

function NameForm(props: Input) {
  const [term, setTerm] = useState('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Got input: ', term);
  };

  return (
    <div className='container'>
      <form onSubmit={submitForm}>
        <TextField
          className='input'
          id='user-input'
          label='Enter some text'
          multiline
          onChange={e => setTerm(e.target.value)}
          type='text'
          value={term}
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

export default NameForm;
