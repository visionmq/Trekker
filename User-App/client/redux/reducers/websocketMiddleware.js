import { useDispatch } from "react-redux";
import { updateAllProperties, updateAvailableDates, updateLoadState } from "./propertySlice";
import { checkoutOutcome } from "./checkoutSlice";
import { signupCurrentUser, loginCurrentUser, failedLogin, failedSignup,  } from "./userSlice";


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
  };

  return (store) => (next) => (action) => {
    dispatch = useDispatch();
    const socketAction = action.socketAction;

    console.log('Websocket has received a message. Here are the contents: ', action);
    
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

        case 'updateInventoryState':
          dispatch(updateAllProperties({properties: action.properties, status: 'success'}));
          break;

        case 'propertySearchFailed':
          dispatch(updateLoadState({status: 'failed'})) 
          break;
        
        case 'noAvail':
          dispatch(updateAvailableDates({quantity: 0}))
          break; //I might need to come back and change this based on how the components subscribe to state 
        
        case 'orderComplete': 
        dispatch(checkoutOutcome({outcome: true}))
          break;

        case 'billingFailed':
          dispatch(checkoutOutcome({outcome: false}))
          break;

        case 'signupSuccessful':
          dispatch(signupCurrentUser({userInfo: action.user }));
          break;

        case 'signupFailed':
          dispatch(failedLogin());
          break;

        case 'loginSuccessful':
          dispatch(loginCurrentUser({userInfo: action.user }));
          break;

        case 'loginFailed':
          dispatch(failedSignup());
          break;

      default:
        return next(action);
    }
  };
};

// export const {  } = websocketSlice.actions;

export default websocketMiddleware;
