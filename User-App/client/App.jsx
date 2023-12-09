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

  const getAllProps = async () => {
    try {
      const sendGet = await fetch('/inv');
      if (sendGet.status < 300) {
        console.log('App has sent a message to get all properties');
      } else console.log(sendGet)
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <div id="app" onLoad={getAllProps}>
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
