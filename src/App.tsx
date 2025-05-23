import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import Home from './pages/Home.page';
import Pricing from './pages/Pricing.page';
import Product from './pages/Product.page';
import PageNotFound from './pages/PageNotFound.page';
import AppLayout from './pages/AppLayout.page';
import Login from './pages/Login.page';
import CityList from './components/CityList';

import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './context/CitiesContext';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:cityId" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
