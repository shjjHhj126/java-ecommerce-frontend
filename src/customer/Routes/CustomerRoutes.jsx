import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import Order from "../components/Order/Order";
import OrderDetails from "../components/Order/OrderDetails";
import HomePage from "../pages/HomePage/HomePage";
import Product from "../components/Product/Product";
import Footer from "../components/Footer/Footer";

const CustomerRoutes = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
