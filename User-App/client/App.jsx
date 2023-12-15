import React from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const connectMiddleware = () => {
    dispatch({ socketAction: 'middlewareConnect'})
  };
  
  const getAllProps = async () => {
    try {
      const sendGet = await fetch('/inv');
      if (sendGet.status < 300) console.log('App has sent a message to get all properties');
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
