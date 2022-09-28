import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  saveUser,
  saveMealsToken,
  saveDrinksToken,
} from '../services/localStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordMinLength = 6;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length > passwordMinLength;
    if (isEmailValid && isPasswordValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ email });
    saveMealsToken(1);
    saveDrinksToken(1);
    history.push('/meals');
  };

  return (
    <div className="container">
      <h1 className="fs-1 fw-bold text-center">Login</h1>
      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
