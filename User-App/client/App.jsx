import React from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  // let ws_url = new URL(window.location.href)
  // ws_url.protocol = "wss:"; //secure protocal
  // ws_url.port = 443;
  console.log('in the App.js')
  const connectMiddleware = () => {
    console.log('connecting to websocket')
    dispatch({ socketAction: 'middlewareConnect'})
  };
  
  const getAllProps = async () => {
    console.log('requesting props')
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
      <div id="app" onLoad={() => {
        connectMiddleware(); 
        getAllProps()
        }}>
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
