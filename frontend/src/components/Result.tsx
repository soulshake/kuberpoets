import React, { useState, useEffect } from 'react';
import { useAppValues } from '../AppContext';
import { analyzeString, ResultError } from '../Api';

export function ResultList() {
  const { blobs } = useAppValues().getAppValues();
  console.debug('in ResultList', blobs);

  if (!blobs || !blobs.length) {
    return null;
  }
  const blobList = blobs.map((blob, index) => (
    <li key={index}>{<Result text={blob} />}</li>
  ));

  return (
    <div>
      <p>This poem feels...</p>
      <ul>{blobList}</ul>
    </div>
  );
}

interface ResultItem {
  text: string;
}
export function Result(props: ResultItem) {
  const text = props.text;
  let emptyErrorList: Array<ResultError> = [];
  const [errors, setErrors] = useState(emptyErrorList);
  const [sentiment, setSentiment] = useState('pending');
  const [duration, setDuration] = useState('pending');

  useEffect(() => {
    console.warn(`text is ${text}, FETCHING`);
    analyzeString(text)
      .then(data => {
        if (data) {
          setSentiment(data.sentiment);
          setDuration(data.duration);
          setErrors(data.errors);
          if (data.errors.length) {
            console.error(`errors for line: ${text} ${JSON.stringify(data.errors)}`);
          }
        }
      })
      .catch(err => {
        console.error('ach scheisse', err);
        setErrors([{ message: err.message }]);
      });
  }, [text]);

  return (
    <div className='container'>
      <div>
        {text} ({sentiment}, {duration} ms){errors && <ErrorList errors={errors} />}
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
