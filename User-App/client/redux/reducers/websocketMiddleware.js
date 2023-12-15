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

  const onMessage = (store) => async (event) => {
    //console.log('we hit inside of the onMessage in the middleware for websocket')
    let message 
    
    try {
      message = await JSON.parse(JSON.stringify(event.data));
      console.log('onMessage event: ', event.data)
    }
    catch (err) {
      console.log('There was an error parsing the message data. ')
    }
    
  };
    return (store) => (next) => (action) => {
      //action = JSON.parse(action.toString)
      console.log('here', action.socketAction)
      const socketAction = action.socketAction;
  
      console.log('Websocket has received a message. Here are the contents: ', action);
      
      switch (socketAction) {
        case 'middlewareConnect':
          console.log('Frontend Has Opened Websocket in Middleware');
  
          if (socket === null) {
            // Create a new WebSocket connection
            socket = new WebSocket(wsUrl);
            socket.onopen = onOpen(store);
            socket.onclose = onClose(store);
            socket.onmessage = onMessage(store);
          }
          break;
        case 'updateInventoryState':
              store.dispatch(updateAllProperties({properties: action.properties, status: 'success'}));
          break;
  
        case 'propertySearchFailed':
            store.dispatch(updateLoadState({status: 'failed'})) 
          break;
          
        case 'noAvail':
          store.dispatch(updateAvailableDates({quantity: 0}))
          break; //I might need to come back and change this based on how the components subscribe to state 
        
        case 'orderComplete': 
        store.dispatch(checkoutOutcome({outcome: true}))
          break;

        case 'billingFailed':
          store.dispatch(checkoutOutcome({outcome: false}))
          break;

        case 'signupSuccessful':
          store.dispatch(signupCurrentUser({userInfo: action.user }));
          break;

        case 'signupFailed':
          store.dispatch(failedSignup({}));
          break;

        case 'loginSuccessful':
          store.dispatch(loginCurrentUser({userInfo: action.user }));
          break;

        case 'loginFailed':
          store.dispatch(failedLogin({}));
          break;
      }
    };
  };



export default websocketMiddleware;



