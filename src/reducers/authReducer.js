  
const initState = {
    userLoggedIn: false,
    errorOccured: false,
    errorMessage: null,
    logginIn: false
  };
  
  const authReducer = (state = initState, action) => {
    switch (action.type) {
      case "AUTH_SUCCESS":
        return {
          ...state,
          userLoggedIn: true,
          logginIn: false
        }
        case "AUTH_FAILED":
          return {
            ...state,
            userLoggedIn: false,
            errorOccured: true,
            errorMessage: action.payload,
            logginIn: false
          }
        case "LOGGING_IN":
          return {
            ...state,
            loggingIn: true
          }
      default:
        return state;
    }
  };
  
  export default authReducer;