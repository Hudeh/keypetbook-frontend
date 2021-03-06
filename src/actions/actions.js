import {post} from 'axios';
import axios from './Api';
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
    HIDE_MESSAGE,
    FETCH_ALL_REPORT_SUCCESS,
    FETCH_REPORT_FAIL
} from './types';
import {stopSubmit, reset}from 'redux-form'


export const showMessage = (message) => (dispatch) => {
  dispatch({
    type: SHOW_MESSAGE,
    payload: message,
  });
  setTimeout(
    () =>
      dispatch({
        type: HIDE_MESSAGE,
      }),
    4000
  );
};

export const import_csv = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get("api/covid/csv", config);
    
            dispatch({
                type: FETCH_ALL_REPORT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_REPORT_FAIL
            });
            console.log("err******:",err)
        }
    } else {
        dispatch({
            type: FETCH_REPORT_FAIL
        });
    }
};
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get("auth/users/me/", config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};
export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await post(`http://127.0.0.1:8000/auth/o/google-oauth2/?${formBody}`, config);

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });
            localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
            dispatch(load_user());
            dispatch(showMessage("Account Success: Please Login with Google to continue"))
        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post("auth/jwt/verify/", body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = { email, password };

    try {
        const res = await axios.post("auth/jwt/create/", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        console.log(res);
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh);
        dispatch(load_user());
      dispatch(stopSubmit("AuthLayout"))
        dispatch(reset("AuthLayout"))
        dispatch(showMessage("Account: Login Success"))
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        console.log(err)
        dispatch(showMessage("Account: Login Fail"))
    }
};

export const signup = ({ first_name, last_name, email, password, re_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = { first_name, last_name, email, password, re_password };

    try {
        const res = await axios.post("auth/users/", body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(stopSubmit("AuthLayout"))
        dispatch(reset("AuthLayout"))
        dispatch(showMessage("Account Created: Check your Email"))
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err
        })
        console.log(err)
        dispatch(stopSubmit("AuthLayout"))
        dispatch(reset("AuthLayout"))
        dispatch(showMessage("Account: SIGNUP FAIL"))
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post("auth/users/activation/", body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
