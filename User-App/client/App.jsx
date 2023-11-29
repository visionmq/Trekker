import React from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div id="app">
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
