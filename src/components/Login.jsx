import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const dashboardPage = () => {
    navigate("/dashboard")
  }

  useEffect(() => {
    const handleSignUpButtonClick = () => {
      container.classList.add("right-panel-active");
    };

    const handleSignInButtonClick = () => {
      container.classList.remove("right-panel-active");
    };

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', handleSignUpButtonClick);
    signInButton.addEventListener('click', handleSignInButtonClick);

    return () => {
      signUpButton.removeEventListener('click', handleSignUpButtonClick);
      signInButton.removeEventListener('click', handleSignInButtonClick);
    };
  }, []);
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div>
      <h2>Codewise</h2>
      <h3>Software Programming Quiz</h3>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input type="text" id="name" placeholder="Name" />
            <input type="email" id="username" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="email" id="username" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <button id="loginbutton" type="submit" onClick={dashboardPage} >Login</button>
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
              <p>Enter your personal details and start building with us</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
