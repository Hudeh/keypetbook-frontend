import React, { useEffect }  from "react";
import { Redirect , useLocation } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import queryString from 'query-string';
import { signup,login,googleAuthenticate} from "../actions/actions";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";





const AuthLayout = ({handleSubmit}) => {
 let location = useLocation();

  useEffect(() => {
      const values = queryString.parse(location.search);
      const state = values.state ? values.state : null;
      const code = values.code ? values.code : null;

      console.log('State: ' + state);
      console.log('Code: ' + code);

      if (state && code) {
        dispatch(googleAuthenticate(state, code));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const authState = useSelector(state => state.auth);
  const {isAuthenticated, alertMessage, showMessage} = authState;
const dispatch = useDispatch()

 const onSubmitSignup = (formValues) => {
    dispatch(signup(formValues));
  };const onSubmitLogin = (formValues) => {
    dispatch(login(formValues));
  };

   const continueWithGoogle = async () => {
        try {
            const res = await axios.get("https://keypetbooks-api.herokuapp.com/auth/o/google-oauth2/?redirect_uri=https://keypetbooks.herokuapp.com/dashboard")

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };   
  
if (isAuthenticated) {
  return <Redirect to="/dashboard" />;
}


  document.addEventListener("DOMContentLoaded", function (history) {
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container');
    const signInButton = document.getElementById('signIn');
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
});


  return (
    <>
    {showMessage && <div id="alert-message"><p>{alertMessage}</p></div>}
      <h2>KeyPetBooks Challenge : Sign in/up Form</h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit(onSubmitSignup)}>
            <h3>Create Account</h3>
            <div className="social-container">
              <a href="#/" className="social" onClick={()=>continueWithGoogle()}>
                <FaGoogle/>
              </a>
            </div>
            <span>or use your email for registration</span>
            <Field
            className="input"
              type="text"
              placeholder="FirstName*"
              name="first_name"
              required
              component={"input"}
            />
            <Field
            className="input"
              type="text"
              placeholder="Last Name*"
              required
              name="last_name"
              component={"input"}
            />
            <Field
            className="input"
              type="email"
              placeholder="Email*"
              name="email"
              required
              component={"input"}
            />
            <Field
            className="input"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              required
              component={"input"}
            />
            <Field
            className="input"
              type="password"
              placeholder="Confrim Password"
              name="re_password"
              minLength="6"
              required
              component={"input"}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#/" className="social" onClick={continueWithGoogle}>
                <FaGoogle/>
              </a>
            </div>
            <span>or use your account</span>
             <Field
             className="input"
              type="email"
              placeholder="Email*"
              name="email"
              required
              component={"input"}
            />
            <Field
            className="input"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              required
              component={"input"}
            />
            <a href="#/">Forgot your password?</a>
            <button type="submit"> Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default reduxForm({
  form: "AuthLayout",
  touchOnBlur: true,
})(AuthLayout);

