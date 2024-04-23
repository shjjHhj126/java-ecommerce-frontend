import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import CustomerRoutes from "./Routes/CustomerRoutes";
import store from "./redux/store";
import { Provider } from "react-redux";
import AdminRoutes from "./Routes/AdminRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
