import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICity } from '../interface/city.interface';

const CITIES_API_ENDPOINT = 'http://localhost:8000/cities';

interface ICitiesContextValue {
  cities: ICity[];
  currentCity: ICity | undefined;
  isCitiesLoading: boolean;
  isCurrentCityLoading: boolean;
  getCity: (cityId: string) => void;
}

interface ICitiesProviderProps {
  children: ReactNode;
}

const CitiesContext = createContext<ICitiesContextValue | undefined>(undefined);

function CitiesProvider({ children }: ICitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [currentCity, setCurrentCity] = useState<ICity>();
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isCurrentCityLoading, setIsCurrentCityLoading] = useState(false);

  useEffect(() => {
    const fetchCities = () => {
      setIsCitiesLoading(true);
      fetch(CITIES_API_ENDPOINT)
        .then((response) => response.json())
        .then((data: ICity[]) => {
          setCities(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsCitiesLoading(false);
        });
    };

    fetchCities();
  }, []);

  async function getCity(cityId: string) {
    setIsCurrentCityLoading(true);
    try {
      const response = await fetch(`${CITIES_API_ENDPOINT}/${cityId}`);
      const data: ICity = await response.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCurrentCityLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isCitiesLoading,
        isCurrentCityLoading,
        getCity,
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
