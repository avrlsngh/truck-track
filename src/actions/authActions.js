import axios from 'axios';
import { apiEndPoint, loginURL, protocol, origin, registerURL } from '../constants/api.js';

export const userLogin = (params) => {
    return (dispatch) => {
        console.log('loggin in with details: ', params, `${loginURL}`);
        axios.post(`${protocol}${origin}${apiEndPoint}${loginURL}`, params).then(data => {
            console.log('data is: ', data);
            dispatch({
                type: 'AUTH_SUCCESS'
            })
        }).catch(err => {
            console.log('error: ', err.response.data.error);
            dispatch({
                type: 'AUTH_FAILED',
                payload: err.response.data.error
            })
        })
    }
}

export const userRegister = (params) => {
    return(dispatch) => {
        axios.post(`${protocol}${origin}${apiEndPoint}${registerURL}`, params).then(data => {
            console.log('user registered data:', data);
            dispatch({
                type: 'AUTH_SUCCESS',
            })
        }).catch(err => {
            console.log('error: ', err.response.data.error);
            dispatch({
                type: 'AUTH_FAILED',
                payload: err.response.data.error
            }) 
        })
    }
}