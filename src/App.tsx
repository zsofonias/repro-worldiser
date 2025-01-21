import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home.page';
import Pricing from './pages/Pricing.page';
import Product from './pages/Product.page';
import PageNotFound from './pages/PageNotFound.page';
import AppLayout from './pages/AppLayout.page';
import Login from './pages/Login.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
