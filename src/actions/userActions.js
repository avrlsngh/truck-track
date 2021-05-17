import axios from 'axios';
import { apiEndPoint, protocol, origin, userFetchURL } from '../constants/api.js';
import { ToastsStore } from "react-toasts";

export const fetchAllUsers = () => {
    return (dispatch) => {
        axios.get(`${protocol}${origin}${apiEndPoint}${userFetchURL}`).then(data => {
            console.log('data is: ', data, );
            dispatch({
                type: 'STORE_USERS',
                payload: data["data"]["data"]
            })
        }).catch(err => {
            // console.log('error: ', err.response.data.error);
            dispatch({
                type: 'FETCH_FAILED',
                payload: 'Error Fetching results'
            })
        })
    }
}

export const fetchUser = (id) => {
    return (dispatch) => {
        axios.get(`${protocol}${origin}${apiEndPoint}${userFetchURL}/${id}`).then(data => {
            console.log('user registered data:', data);
            dispatch({
                type: 'STORE_USER',
                payload: data["data"]["data"]
            })
        })
    }
}

export const updateUserDetails = (fieldName, value) => {
    return (dispatch, getState) => {
        let userDetails = getState().userReducer.userDetails;
        userDetails[fieldName] = value;
        console.log('userDetails: ', userDetails);
        dispatch({
            type: 'UPDATE_USER_DETAILS',
            payload: userDetails
        })
    }
}

export const updateUser = () => {
    return(dispatch, getState) => {
        let userDetails = getState().userReducer.userDetails;
        axios.patch(`${protocol}${origin}${apiEndPoint}${userFetchURL}/${userDetails.id}`, userDetails).then(data => {
            console.log('details updated: ', data);
            ToastsStore.success(
                "User Details Updated"
              );
            dispatch({
                type: 'USER_UPDATE_SUCCESS',
            })
        })
    }
}

export const setActiveUser = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_USER',
            payload: {activeUser: id}
        })
    }
}

export const toggleDeleteModal = (toggleValue) => {
    return(dispatch) => {
        dispatch({
            type: 'TOGGLE_DELETE',
            payload: toggleValue
        })
    }
}

export const toggleAddModal = (toggleValue) => {
    return(dispatch) => {
        dispatch({
            type: 'TOGGLE_ADD',
            payload: toggleValue
        })
    }
}

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        axios.delete(`${protocol}${origin}${apiEndPoint}${userFetchURL}/${id}`).then(data => {
            console.log('deleted user: ',data);
            const usersList = getState().userReducer.usersList;
            let newUsersList = [];
            newUsersList = usersList.filter(item => {
                return item.id !== id
            })
            console.log('users list: ', usersList);
            ToastsStore.success(
                "User Deleted Successfully"
              );
            dispatch({
                type: 'REMOVE_USER_FROM_LIST',
                payload: {newUsersList}
            })
            // fetchAllUsers();
        });
    }
}

export const addUser = (params) => {
    return (dispatch, getState) => {
        axios.post(`${protocol}${origin}${apiEndPoint}${userFetchURL}`, params).then(data => {
            console.log('added data: ', data);
            const usersList = getState().userReducer.usersList;
            params['id'] = data.data['id']
            usersList.unshift(params);
            ToastsStore.success(
                "User Added Successfully"
              );
            dispatch({
                type: 'USER_ADDED',
                payload: {newUsersList: usersList}
            })
        })
    }
}

export const searchUsers = (keyword) => {
    return(dispatch, getState) => {
        if(keyword.trim() === ''){
            dispatch({
                type: 'SEARCH_STOP'
            })
        }
        const usersList = getState().userReducer.usersList;
        let newUsersList = usersList.filter(item => {
            console.log(item.first_name.includes(keyword), keyword, item.first_name);
            if(item.email.includes(keyword) ||
            item.first_name.includes(keyword) ||
            item.last_name.includes(keyword)){
                return true
            }
            return false
        })
        console.log('list is: ', newUsersList);
        dispatch({
            type: 'SEARCH_LIST',
            payload: {newUsersList}
        })
    }
}
