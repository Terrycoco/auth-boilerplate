const API_URL = 'http://api-tmarr.rhcloud.com/';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, 
         AUTH_ERROR,
         CLEAR_ERROR,
         UNAUTH_USER, 
         CLEAR_SUBMIT } from 'actions/types';

export function signinUser({email, password}) {
	//redux-thunk allows us to return a function which accepts the dispatch function
	//redux-thunk will automatically call this function
	return function( dispatch ) {  
   //submit email password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
      // req is good...
         // update state to indicate user is authenticated
         dispatch({type: AUTH_USER});
        // save jwt token to local storage
         localStorage.setItem('token', response.data.token);
	       // redirect to protected route
	       browserHistory.push('/feature');
      })
      .catch(() => {
      //req is bad...

       // show error to user)
       dispatch(authError('Bad login info'));
      });
   }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signupUser({email, password}) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password})
    .then(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch((response) => {
      dispatch({
         type: AUTH_ERROR,
         payload: response.data.error
      });
    })
  }
}

export function clearError() {
  return {type: CLEAR_ERROR};
}

export function clearSubmit() {
  return {type: CLEAR_SUBMIT};
}