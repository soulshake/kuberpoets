import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import getRandom from '../randomPoem';

interface InputFormProps {
  setSubmittedBlob: any;
}
function InputForm(props: InputFormProps) {
  const { setSubmittedBlob } = props;
  const [blob, setBlob] = useState('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`setting submitted blob to: '${blob}'`);
    setSubmittedBlob(blob);
  };

  return (
    <div className='container'>
      <form onSubmit={submitForm} style={{ minWidth: '500px' }}>
        <TextField
          autoFocus
          fullWidth
          id='user-input'
          label='Enter some text'
          multiline
          onChange={e => setBlob(e.target.value)}
          type='text'
          value={blob}
          variant='outlined'
        />
        <div>
          <Button style={{ margin: '2px' }} type='submit' variant='outlined'>
            Analyze
          </Button>
          <RandomButton setBlob={setBlob} />
        </div>
      </form>
    </div>
  );
}

interface RandomButtonProps {
  setBlob: any;
}
function RandomButton(props: RandomButtonProps) {
  const { setBlob } = props;
  function handleClick() {
    console.log('we got clicked');
    setBlob(getRandom());
  }
  return (
    <Button
      style={{ margin: '2px' }}
      type='button'
      variant='outlined'
      onClick={handleClick}
    >
      Random
    </Button>
  );
}

export default InputForm;
