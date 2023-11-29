import React from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import Header from "./components/Header.jsx";
import { BrowserRouter as Router} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div id="app">
        <Header />
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
