import Header from "./components/header/header";
import HomePage from "./components/pages/home-page/homePage";
import "./default.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
