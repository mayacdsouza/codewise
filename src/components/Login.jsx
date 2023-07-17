/*
This file represents the Login component, which is responsible for handling the login and signup functionality
in the application.
It imports necessary dependencies and components from the React and 'react-router-dom' libraries.
It also imports the LoginValidation and SignUpValidation functions for form validation, and the axios library
for making HTTP requests.
*/

import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginValidation from './LoginValidation';
import SignUpValidation from './SignUpValidation';
import axios from 'axios';

/*
The Login component is a functional component that renders a login and signup form.
It manages the form inputs, form submission, and handles form validation and API requests.
*/
function Login() {
  const [values, setValues] = useState({
    login_email: '',
    login_password_hash: '',
    formType: 'login'
  });

  const [signupValues, setSignupValues] = useState({
    name: '',
    signup_email: '',
    company: '',
    signup_password_hash: '',
    formType: 'signup'
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const [err, setErr] = useState({})
  const [backendError, setBackendError] = useState([])
  const [isSignUpActive, setIsSignUpActive] = useState(false)

  /*
  The useEffect hook is used to add event listeners to handle sign up and sign in button clicks.
  It runs only once, when the component is mounted.
  */
  useEffect(() => {
    const handleSignUpButtonClick = () => {
      container.classList.add("right-panel-active");
      setIsSignUpActive(true);
    };

    const handleSignInButtonClick = () => {
      container.classList.remove("right-panel-active");
      setIsSignUpActive(false);
    };

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', handleSignUpButtonClick);
    signInButton.addEventListener('click', handleSignInButtonClick);

    // Clean up the event listeners when the component is unmounted
    return () => {
      signUpButton.removeEventListener('click', handleSignUpButtonClick);
      signInButton.removeEventListener('click', handleSignInButtonClick);
    };
  }, []);

  /**
  Event handler for input changes in the login form.
  Updates the respective form values in the state.
  */
  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.id]: [e.target.value] }));
  };

  /*
  Event handler for input changes in the signup form.
  Updates the respective form values in the state.
  */
  const handleSignupInput = (e) => {
    setSignupValues(prev => ({ ...prev, [e.target.id]: [e.target.value] }));
  };

  /**
  Event handler for form submission.
  Performs form validation and sends API requests based on the form type (login or signup).
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUpActive) {
      // Form validation for signup form
      const signupErr = SignUpValidation(signupValues);
      setErr(signupErr);

      // If there are no validation errors, send the signup form data to the server
      if (signupErr.name === "" && signupErr.email === "" && signupErr.company === "" && signupErr.password === "") {
        const formData = { ...signupValues, formType: 'signup' };
        axios.post('http://localhost:3306/', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            alert("Sign up successful. Please login with your credentials.");
            navigate('/');
          })
          .catch(signupErr => console.log(signupErr));
      }
    } else {
      // Form validation for login form
      const err = LoginValidation(values);
      setErrors(err);
      // If there are no validation errors, send the login form data to the server
      if (err.email === "" && err.password === "") {
        axios.post('http://localhost:3306/', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            if (res.data.errors) {
              setBackendError(res.data.errors);
            } else {
              setBackendError([]);
              if (res.data === "Success") {
                navigate('/dashboard');
              } else {
                alert("Account does not exist.");
              }
            }
          })
          .catch(err => console.log(err));
      }
    }
  };

  /*
  Render the Login component.
  It includes a title, the login/signup form, and a toggle button for switching between login and signup.
  */
  return (
    <div>
      <h2>Codewise</h2>
      <h3>Software Programming Quiz</h3>
      <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <Fragment>
              <input type="text" id="name" placeholder="Name" onChange={handleSignupInput} />
              {err.name && <span className='text-danger'>{err.name}</span>}
            </Fragment>
            <Fragment>
              <input type="email" id="signup_email" placeholder="Email" onChange={handleSignupInput} />
              {err.email && <span className='text-danger'>{err.email}</span>}
            </Fragment>
            <Fragment>
              <input type="text" id="company" placeholder="Company" onChange={handleSignupInput} />
              {err.company && <span className='text-danger'>{err.company}</span>}
            </Fragment>
            <Fragment>
              <input type="password" id="signup_password_hash" placeholder="Password" onChange={handleSignupInput} />
              {err.password && <span className='text-danger'>{err.password}</span>}
            </Fragment>
            <input type="hidden" id="formType" value="signup"></input>
            <button id="signupbutton" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          {backendError ? backendError.map(e => (<p key={e.msg} className='text-danger'>{e.msg}</p>)) : <span></span>}
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Fragment>
              <input type="email" id="login_email" placeholder="Email" onChange={handleInput} />
              {errors.email && <span className='text-danger'>{errors.email}</ span>}
            </Fragment>
            <Fragment>
              <input type="password" id="login_password_hash" placeholder="Password" onChange={handleInput} />
              {errors.password && <span className='text-danger'>{errors.password}</ span>}
            </Fragment>
            <input type="hidden" id="formType" value="login"></input>
            <button id="loginbutton" type="submit">Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back, Codewiser!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="ghost" id="signIn">Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Codewiser!</h1>
              <p>Enter your personal details and start creating with us</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
