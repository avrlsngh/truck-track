  
const initState = {
    usersList: [],
    userDetails: [],
    fetchFailed: false,
    fetchFailedReason: null,
    activeUser: null,
    userDeleted: false,
    userAdded: false,
    isSearchEnabled: false,
    searchUsersList: []
  };
  
  const userReducer = (state = initState, action) => {
    switch (action.type) {
      case 'STORE_USERS':
        return{
          ...state,
          usersList: action.payload
        }
      case 'STORE_USER':
        return{
          ...state,
          userDetails: action.payload
        }
      case 'FETCH_FAILED':
        return{
          ...state,
          fetchFailed: true,
          fetchFailedReason: action.payload
        }
      case "SET_ACTIVE_USER":
        return{
          ...state,
          activeUser: action.payload.activeUser
        }
      case "REMOVE_USER_FROM_LIST":
        return{
          ...state,
          userDeleted: false,
          usersList: action.payload.newUsersList
        }
      case "TOGGLE_DELETE":
        return{
          ...state,
          userDeleted: action.payload
        }
      case "TOGGLE_ADD":
        return{
          ...state,
          userAdded: action.payload
        }
      case 'USER_ADDED':
        return{
          ...state,
          userAdded: false,
          usersList: action.payload.newUsersList
        }
      case 'SEARCH_LIST':
        return{
          ...state,
          searchUsersList: action.payload.newUsersList,
          isSearchEnabled: true
        }
      case 'SEARCH_STOP':
        return{
          ...state,
          isSearchEnabled: false
        }
      case 'UPDATE_USER_DETAILS':
        return{
          ...state,
          userDetails: action.payload
        }
      default:
        return state;
    }
  };
  
  export default userReducer;