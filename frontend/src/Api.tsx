const API_URL = window.env.API_URL;

export type ResultError = {
  message: string;
};
type ResultData = {
  sentiment: string;
  duration: string;
  errors: Array<ResultError>;
};

type JSONResponse = {
  data?: ResultData;
};

export async function analyzeString(text: string): Promise<ResultData> {
  const path = '/analyze';
  console.log(`querying API_URL=${API_URL} path=${path} text=${text}`);

  const response = await window.fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      text: text,
    }),
  });

  console.log(response);

  if (response.ok) {
    const { data }: JSONResponse = await response.json();
    console.debug(`got response: data=${JSON.stringify(data)}`);
    if (data && data.sentiment && data.errors) {
      return data;
    }
    console.warn("Response didn't match expected format:", data);
    return Promise.reject(
      new Error(`Response didn't match expected format: ${JSON.stringify(data)}`),
    );
  }

  return Promise.reject(
    new Error(
      `Got ${response.status} for ${response.url}: ${response.statusText}, API_URL=${API_URL}`,
    ),
  );
}
