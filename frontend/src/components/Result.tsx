import React, { useState, useEffect, useRef } from 'react';
import { analyzeString, ResultError } from '../Api';

interface ResultListProps {
  submittedBlob: string;
}
export function ResultList(props: ResultListProps) {
  const { submittedBlob } = props;

  if (!submittedBlob) {
    return null;
  }
  console.log('in ResultList', submittedBlob);
  const blobs: Array<string> = submittedBlob.trim().split('\n');
  console.log('blobs is', blobs);

  const blobList = blobs.map((submittedBlob, index) => (
    <li key={index}>{<Result text={submittedBlob} />}</li>
  ));

  return (
    <div>
      <p>This poem feels...</p>
      <div style={{ textAlign: 'left' }}>
        <ul>{blobList}</ul>
      </div>
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
  const [sentiment, setSentiment] = useState('');
  const [duration, setDuration] = useState('');
  const pending = useRef(false);

  useEffect(() => {
    if (pending.current || text === '') {
      return;
    }
    pending.current = true;
    setSentiment('');
    setDuration('');
    setErrors(emptyErrorList);
    console.log(`text is ${text}, FETCHING`);
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
        pending.current = false;
      })
      .catch(err => {
        console.error('ach scheisse', err);
        setErrors([{ message: err.message }]);
        pending.current = false;
      });
  }, [text]);

  return (
    <div className='container'>
      <div>
        <Text value={text} pending={pending.current} /> &nbsp;&nbsp;
        <Sentiment value={sentiment} pending={pending.current} />{' '}
        <Duration value={duration} pending={pending.current} />
        <ErrorList errors={errors} />
      </div>
    </div>
  );
}

// The line of text
interface TextProps {
  value: string;
  pending: boolean;
}
function Text(props: TextProps) {
  let color = 'blue';
  if (props.pending) {
    color = 'gray';
  }
  return <span style={{ color: color }}>{props.value}</span>;
}

// Duration
interface DurationProps {
  value: string;
  pending: boolean;
}
function Duration(props: DurationProps) {
  let toShow = props.value;
  if (!props.pending && toShow !== '') {
    toShow += 'ms';
  }
  return (
    <span style={{ fontSize: 'small', display: 'inline-block', width: '100px' }}>
      {toShow}
    </span>
  );
}

// The sentiment
interface SentimentProps {
  value: string;
  pending: boolean;
}
function Sentiment(props: SentimentProps) {
  if (props.pending) {
    return <span>⌛</span>;
  }
  const emojis: Record<string, string> = {
    joy: '😊',
    sadness: '😔',
    optimism: '🤠',
    anger: '👺'
  };
  return <span>{emojis[props.value]}</span>;
}

// Errors
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
