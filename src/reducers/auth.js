import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    LOGOUT,
    SHOW_MESSAGE,
    HIDE_MESSAGE
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: {},
    alertMessage: "",
    showMessage: false,
    isLoading: false
};

const auth= (state = initialState, action) =>{
    const { type, payload } = action;

    switch(type) {
        case SHOW_MESSAGE:
            return {
                ...state,
                showMessage: true,
                alertMessage:payload
            }
             case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
      };
    }
            case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                isLoading: false,
                user: payload
                
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                isLoading:false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return { ...state, message:payload,accountCreated: false}
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};
export default auth;