import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import CustomerRoutes from "./customer/Routes/CustomerRoutes";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
