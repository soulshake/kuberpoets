const API_URL = 'http://localhost:5000';
export type ResultError = {
  message: string;
};
type ResultData = {
  sentiment: string;
  errors: Array<ResultError>;
};

type JSONResponse = {
  data?: ResultData;
  // errors?: Array<ResultError>;
};

export async function analyzeString(text: string): Promise<ResultData> {
  console.debug('querying api', text);

  const response = await window.fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      text: text,
    }),
  });

  const { data }: JSONResponse = await response.json();
  if (response.ok) {
    console.log(`got response: data=${data}`);
    if (data && data.sentiment && data.errors) {
      return data;
    }
    console.warn("Response didn't match expected format:", data);
    return Promise.reject(
      new Error(`Response didn't match expected format: ${JSON.stringify(data)}`),
    );
  }
  // we shouldn't be here
  return Promise.reject(
    new Error(`No result could be retrieved, but also got no errors`),
  );
}
