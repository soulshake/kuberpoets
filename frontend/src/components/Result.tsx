import React, { useState } from 'react';
import { useAppValues } from '../AppContext';
import { analyzeString, ResultError } from '../Api';

export function ResultList() {
  const { blobs } = useAppValues().getAppValues();
  console.log('in ResultList', blobs);
  return (
    <div>
      {blobs?.length && <p>This poem feels...</p>}
      <ul>
        {blobs &&
          blobs.map((blob: string) => {
            return <li key={blob}>{<Result text={blob} />}</li>;
          })}
      </ul>
    </div>
  );
}

interface ResultItem {
  text: string;
}
export function Result(props: ResultItem) {
  const [text, setText] = useState(props.text);
  let wat: Array<ResultError> = [];
  const [errors, setErrors] = useState(wat);
  const [sentiment, setSentiment] = useState('pending');

  let shouldFetch = false;
  if (props.text && props.text !== text) {
    shouldFetch = true;
    setText(props.text);
    setErrors([]);
    console.log('blanking errs, changing text to', props.text);
  }
  if (sentiment === 'pending') {
    shouldFetch = true;
  }
  if (shouldFetch) {
    analyzeString(text)
      .then(data => {
        if (data) {
          console.log('got data back', data);
          setSentiment(data.sentiment);
          if (data.errors) {
            console.log('setting errors here', data.errors);
            setErrors(data.errors);
          }
        } else {
          console.warn('got no data back :(');
        }
      })
      .catch(err => {
        console.error('ach scheisse', err);
        setErrors([{ message: err.message }]);
      });
  }

  if (errors.length) {
    console.error('errors', errors);
  }
  for (const e of errors) {
    console.error('reeee', e.message);
  }
  return (
    <div className='container'>
      <div>
        <p>
          {text} ({sentiment}){errors && <ErrorList errors={errors} />}
        </p>
      </div>
    </div>
  );
}
interface ErrorListProps {
  errors: Array<ResultError>;
}
function ErrorList(props: ErrorListProps) {
  const errors = props.errors;
  if (!errors.length) {
    return null;
  }
  return (
    <ul className='error'>
      {errors.map((e: ResultError) => {
        return <li key={e.message}>{e.message}</li>;
      })}
    </ul>
  );
}
