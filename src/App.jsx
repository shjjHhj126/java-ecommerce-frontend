import "./App.css";
import Navigation from "./customer/components/Navigation/Navigation";
import HomePage from "./customer/pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <Navigation />
      <div className="">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
