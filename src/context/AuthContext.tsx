import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import { IUser } from '../interface/auth.interface';

interface IAuthContext {
  user: IUser | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface IState {
  user: IUser | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
}

enum ActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

type Action =
  | { type: ActionType.LOGIN; payload: IUser }
  | { type: ActionType.LOGOUT }
  | { type: ActionType.LOADING }
  | { type: ActionType.ERROR; payload: string };

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

const initialState = {
  user: undefined,
  isAuthenticated: false,
  isLoading: false,
  error: '',
};

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
        isLoading: false,
      };
    case ActionType.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error('Invalid action type');
  }
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({ children }: PropsWithChildren) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      return dispatch({
        type: ActionType.ERROR,
        payload: 'Invalid credentials',
      });
    }
    dispatch({ type: ActionType.LOGIN, payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: ActionType.LOGOUT });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
