// import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import { updateAllProperties } from "./propertySlice";

const websocketMiddleware = (wsUrl) => {
  let socket = null;

  const onOpen = (store) => (event) => {
    /**Not Used */
  };

  const onClose = (store) => (event) => {
    /**Not Used */
  };

  const onMessage = (store) => (event) => {
    console.log('Received Message: ', event.data);
    // let message;

    //switch case to distribute actions based on websocket incoming message:
  };

  return (store) => (next) => (action) => {
    const socketAction = action.socketAction;

    switch (socketAction) {
      case 'middlewareConnect':
        console.log('[x] Frontend Has Opened Websocket in Middleware');

        if (socket === null) {
          // Create a new WebSocket connection
          socket = new WebSocket(wsUrl);
          socket.onopen = onOpen(store);
          socket.onclose = onClose(store);
          socket.onmessage = onMessage(store);
        }
        break;

        case 'orderComplete':
        //dispatch redux reducer to change state 
        break;

        case 'updateInventoryState':
          dispatch(updateAllProperties({properties: action.properties}));
          break;
      default:
        return next(action);
    }
  };
};

// export const {  } = websocketSlice.actions;

export default websocketMiddleware;
