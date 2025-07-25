import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { ICity } from '../interface/city.interface';

const CITIES_API_ENDPOINT = 'http://localhost:8000/cities';

interface ICitiesContextValue {
  cities: ICity[];
  currentCity: ICity | undefined;
  isLoading: boolean;
  error?: string;
  getCity: (cityId: string) => void;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: number) => void;
}

interface IState {
  cities: ICity[];
  currentCity: ICity | undefined;
  isLoading: boolean;
  error: string;
}

const initialState: IState = {
  cities: [],
  currentCity: undefined,
  isLoading: false,
  error: '',
};

enum ActionType {
  SET_CITIES = 'SET_CITIES',
  CITIES_LOADED = 'CITIES_LOADED',
  SET_CITY = 'SET_CITY',
  CITY_LOADED = 'CITY_LOADED',
  CREATE_CITY = 'CREATE_CITY',
  CITY_CREATED = 'CITY_CREATED',
  DELETE_CITY = 'DELETE_CITY',
  CITY_DELETED = 'CITY_DELETED',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  REJECTED = 'REJECTED',
}

type Action =
  | { type: ActionType.SET_CITIES; payload: ICity[] }
  | { type: ActionType.CITIES_LOADED; payload: ICity[] }
  | { type: ActionType.SET_CITY; payload: ICity }
  | { type: ActionType.CITY_LOADED; payload: ICity }
  | { type: ActionType.CREATE_CITY; payload: ICity }
  | { type: ActionType.CITY_CREATED; payload: ICity }
  | { type: ActionType.DELETE_CITY; payload: number }
  | { type: ActionType.CITY_DELETED; payload: number }
  | { type: ActionType.SET_LOADING; payload: boolean }
  | { type: ActionType.SET_ERROR; payload: string }
  | { type: ActionType.REJECTED; payload: string };

const CitiesContext = createContext<ICitiesContextValue | undefined>(undefined);

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case ActionType.SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case ActionType.CITIES_LOADED:
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case ActionType.SET_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };
    case ActionType.CITY_LOADED:
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case ActionType.CREATE_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case ActionType.CITY_CREATED:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case ActionType.DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(
          (city: ICity) => city.id !== action.payload
        ),
      };
    case ActionType.CITY_DELETED:
      return {
        ...state,
        cities: state.cities.filter(
          (city: ICity) => city.id !== action.payload
        ),
        currentCity: undefined,
        isLoading: false,
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionType.REJECTED:
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      throw new Error('Invalid action type');
  }
}

function CitiesProvider({ children }: PropsWithChildren) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = () => {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      fetch(CITIES_API_ENDPOINT)
        .then((response) => response.json())
        .then((data: ICity[]) => {
          dispatch({ type: ActionType.CITIES_LOADED, payload: data });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: ActionType.SET_ERROR,
            payload: 'Failed to load cities',
          });
        });
    };

    fetchCities();
  }, []);

  async function getCity(cityId: string) {
    if (Number(currentCity?.id) === Number(cityId)) return;
    dispatch({ type: ActionType.SET_LOADING, payload: true });
    try {
      const response = await fetch(`${CITIES_API_ENDPOINT}/${cityId}`);
      const data: ICity = await response.json();
      console.log(data);
      dispatch({ type: ActionType.CITY_LOADED, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: ActionType.SET_ERROR, payload: 'Failed to load city' });
    }
  }

  async function createCity(newCity: ICity) {
    dispatch({ type: ActionType.SET_LOADING, payload: true });
    try {
      const response = await fetch(CITIES_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: ICity = await response.json();
      dispatch({ type: ActionType.CITY_CREATED, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERROR,
        payload: 'Failed to create city',
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: ActionType.SET_LOADING, payload: true });
    try {
      await fetch(`${CITIES_API_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: ActionType.CITY_DELETED, payload: id });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ActionType.SET_ERROR,
        payload: 'Failed to delete city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      'use CitiesContext should only be used with in CitiesProvider'
    );
  }
  return context;
}

export { CitiesProvider, useCities };
