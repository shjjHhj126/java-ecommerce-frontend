import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/management/*" element={<AdminRoutes />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
