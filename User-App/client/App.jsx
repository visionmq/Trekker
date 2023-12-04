import React, { useEffect } from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";

const App = () => {
  let ws_url = new URL(window.location.href)
ws_url.protocol = "ws:";
ws_url.port = 443;

  useEffect(() => {
    let socket = new WebSocket(ws_url.toString());
    socket.onmessage = (msg) => console.log('Got message: ', msg.data)
    console.log('Frontend opening WS')
  }, [])

  return (
    <Router>
      <div id="app">
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
