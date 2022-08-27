import React, { useContext, createContext } from 'react';

export interface AppValues {
  blob: string | null;
  blobs: Array<string> | null;
}

export const initialAppValues: AppValues = {
  blob: '',
  blobs: [],
};

type AppValuesAction = {
  type: 'appValues/SET';
  value: Partial<AppValues>;
};

function appValuesReducer(state: AppValues, action: AppValuesAction): AppValues {
  switch (action.type) {
    case 'appValues/SET': {
      return {
        ...state,
        ...action.value,
      };
    }

    default:
      return state;
  }
}

export interface AppProviderValue {
  setAppValues: (value: Partial<AppValues>) => void;
  getAppValues: () => AppValues;
}

const AppContext = createContext<AppProviderValue | null>(null);

export function useAppValues() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppValues() must be used within a AppProvider.');
  }
  return context;
}

type Props = {
  [k in keyof AppValues]?: AppValues[k];
} & { children: React.ReactNode };

export function AppProvider(props: Props) {
  const { children, ...otherProps } = props;
  const [appValuesState, appValuesDispatch] = React.useReducer<
    React.Reducer<AppValues, AppValuesAction>
  >(appValuesReducer, {
    ...initialAppValues,
    ...otherProps,
  });
  const getAppValues = React.useCallback((): AppValues => {
    return appValuesState;
  }, [appValuesState]);
  const setAppValues = React.useCallback(
    (value: Partial<AppValues>): void => {
      appValuesDispatch({ type: 'appValues/SET', value });
    },
    [appValuesDispatch],
  );

  return (
    <AppContext.Provider value={{ getAppValues, setAppValues }}>
      {children}
    </AppContext.Provider>
  );
}
