import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import Home from './pages/Home.page';
import Pricing from './pages/Pricing.page';
import Product from './pages/Product.page';
import PageNotFound from './pages/PageNotFound.page';
import AppLayout from './pages/AppLayout.page';
import Login from './pages/Login.page';
import CityList from './components/CityList';

import { ICity } from './interface/city.interface';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const CITIES_API_ENDPOINT = 'http://localhost:8000/cities';

function App() {
  const [cities, setCities] = useState<ICity[]>([]);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList isLoading={isLoading} cities={cities} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
