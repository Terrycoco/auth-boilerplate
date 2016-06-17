import { 	AUTH_USER, 
					UNAUTH_USER,
					AUTH_ERROR,
          CLEAR_SUBMIT,
          CLEAR_ERROR} from 'actions/types';

const INITIAL_STATE = {
	authenticated: false,
	error: '',
  submitted: false
};


export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
  	case AUTH_USER:
  		return { ...state, authenticated: true, error: '', submitted: true};
  	case UNAUTH_USER:
  		return { ...state, authenticated: false, submitted: true};
  	case AUTH_ERROR:
  		return { ...state, error: action.payload, submitted: true};
    case CLEAR_SUBMIT:
      return {...state, submitted: false};
    case CLEAR_ERROR:
      return {...state, error: ''};
  }
  return state;
}