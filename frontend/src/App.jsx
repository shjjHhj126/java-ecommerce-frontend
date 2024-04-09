import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import CustomerRoutes from "./customer/Routes/CustomerRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
