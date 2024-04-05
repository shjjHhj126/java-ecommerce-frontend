import "./App.css";
import Navigation from "./customer/components/Navigation/Navigation";
import HomePage from "./customer/pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          {/* <HomePage /> */}
          <Route path="/product" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
