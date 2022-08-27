import React, { useState } from 'react';
import { useAppValues } from '../AppContext';

interface ResultItem {
  text: string;
}
export function Result(props: ResultItem) {
  const [text, setText] = useState(props.text);
  const [sentiment, setSentiment] = useState('pending');
  if (props.text !== text) {
    setText(props.text);
  }
  if (sentiment === 'pending') {
    if (text.length % 2 === 0) {
      setSentiment('happy');
    } else {
      setSentiment('sad');
    }
  }

  return (
    <div className='container'>
      <p>
        Line: {text} ({sentiment})
      </p>
    </div>
  );
}

export function ResultList() {
  const { blobs } = useAppValues().getAppValues();
  return (
    <ul>
      <p>This poem feels...</p>
      {blobs &&
        blobs.map((blob: string) => {
          return <li key={blob}>{<Result text={blob} />}</li>;
        })}
    </ul>
  );
}
