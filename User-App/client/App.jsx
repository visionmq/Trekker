import React, { useEffect } from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  // let ws_url = new URL(window.location.href)
  // ws_url.protocol = "wss:"; //secure protocal
  // ws_url.port = 443;

  useEffect(() => dispatch({ socketAction: 'middlewareConnect'}), [])

  return (
    <Router>
      <div id="app">
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
