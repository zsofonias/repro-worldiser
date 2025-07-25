import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import { CitiesProvider } from './context/CitiesContext';
import { AuthProvider } from './context/AuthContext';

// import Home from './pages/Home.page';
// import Pricing from './pages/Pricing.page';
// import Product from './pages/Product.page';
// import Login from './pages/Login.page';
// import AppLayout from './pages/AppLayout.page';
// import PageNotFound from './pages/PageNotFound.page';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/UI/SpinnerFullPage';

const Home = lazy(() => import('./pages/Home.page'));
const Product = lazy(() => import('./pages/Product.page'));
const Pricing = lazy(() => import('./pages/Pricing.page'));
const Login = lazy(() => import('./pages/Login.page'));
const AppLayout = lazy(() => import('./pages/AppLayout.page'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.page'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
