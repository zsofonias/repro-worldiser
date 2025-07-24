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
  isLoading: boolean;
  getCity: (cityId: string) => void;
  createCity: (newCity: ICity) => void;
  deleteCity: (id: number) => void;
}

interface ICitiesProviderProps {
  children: ReactNode;
}

const CitiesContext = createContext<ICitiesContextValue | undefined>(undefined);

function CitiesProvider({ children }: ICitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [currentCity, setCurrentCity] = useState<ICity>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = () => {
      setIsLoading(true);
      fetch(CITIES_API_ENDPOINT)
        .then((response) => response.json())
        .then((data: ICity[]) => {
          setCities(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchCities();
  }, []);

  async function getCity(cityId: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`${CITIES_API_ENDPOINT}/${cityId}`);
      const data: ICity = await response.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
      alert('Failed to get city');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: ICity) {
    setIsLoading(true);
    try {
      const response = await fetch(CITIES_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: ICity = await response.json();
      setCities((prevCities) => [...prevCities, data]);
    } catch (err) {
      console.log(err);
      alert('Failed to create city');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: number) {
    setIsLoading(true);
    try {
      await fetch(`${CITIES_API_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch (err) {
      console.log(err);
      alert('Failed to delete city');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
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
