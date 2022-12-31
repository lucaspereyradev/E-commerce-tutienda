import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';

import Footer from './components/essential-components/Footer';
import Navbar from './components/essential-components/Navbar';
import DetailsProducts from './components/pages/DetailsProducts';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import CartPage from './components/pages/CartPage';
import AddProductsPage from './components/pages/AddProductsPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

function App() {
    return (
        <>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<DetailsProducts />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/addproducts" element={<AddProductsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </>
    );
}

export default App;
