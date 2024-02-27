import { useState } from 'react';
import './App.css';
import Account from './component/Account';
import Cart from './component/Cart';
import Featured from './component/Featured';
import Footer from './component/Footer';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Products from './component/Products';
import Productsdetail from './component/Productsdetail';
import { Route, Routes } from "react-router-dom"
import Alerts from './component/Alerts';
import { CartProvider } from './component/ContexReducer';
import About from './component/About';
import Profile from './component/Profile';
import Payment from './component/Payment';

function App() {
  const [alert, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ message: message, type: type });
    setTimeout(() => {
      setAlerts(null);
    }, 1500);
  }
  return (
    <CartProvider>
      <>
        <Alerts alert={alert} />
        <Navbar showAlerts={showAlerts} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productsdetails" element={<Productsdetail showAlerts={showAlerts} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  );
}

export default App;
