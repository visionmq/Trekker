import React, { useEffect, useState } from "react";
import MainContainer from "./components/MainContainer/MainContainer.jsx";
import { BrowserRouter as Router} from "react-router-dom";

const App = () => {

  const [socket, setSocket] = useState('')
  let ws_url = new URL(window.location.href)
  ws_url.protocol = "ws:";
  ws_url.port = 443;

  useEffect(() => {
    // setSocket(new WebSocket(ws_url.toString()))
    console.log('Frontend opening WS')
  }, [])

  if(socket !== '') socket.onmessage = (msg) => console.log('Got message: ', msg.data)

  return (
    <Router>
      <div id="app">
        <MainContainer />
      </div>
    </Router>
  );
};

export default App;
