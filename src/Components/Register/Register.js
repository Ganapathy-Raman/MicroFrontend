import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../AuthService';
import './Register.css';
import Nav from '../Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarDay, faLock, faGenderless } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regexUpperCase = /[A-Z]/;
    const regexSymbol = /[!@#$%^&*(),.?":{}|<>]/;
    const regexNumber = /[0-9]/;

    if (!regexUpperCase.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!regexSymbol.test(password)) {
      setPasswordError('Password must contain at least one symbol');
      return false;
    }
    if (!regexNumber.test(password)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    return validatePassword(confirmPassword);
  };

  const validateValues = () => {
    let isValid = true;

    if (userName.trim() === '') {
      setUserNameError('Please enter username');
      isValid = false;
    } else if (!/^[A-Z][A-Za-z0-9 ]{2,19}$/.test(userName)) {
      setUserNameError('User Name must start with a capital letter and be 3-20 characters long');
      isValid = false;
    } else {
      setUserNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Please enter email');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,255}$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (dateOfBirth.trim() === '') {
      setDateOfBirthError('Please choose date of birth');
      isValid = false;
    } else {
      setDateOfBirthError('');
    }

    if (gender.trim() === '') {
      setGenderError('Please enter Gender');
      isValid = false;
    } else {
      setGenderError('');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter Password');
      isValid = false;
    } else {
      if (!validatePassword(password)) {
        isValid = false;
      }
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please enter Confirm Password');
      isValid = false;
    } else {
      if (!validateConfirmPassword(password, confirmPassword)) {
        isValid = false;
      }
    }

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = validateValues();

    if (result) {
      try {
        const response = await AuthService.register({ userName, email, dateOfBirth, gender, password });
        setMessage(response.data);
        if (response.data === 'User registered successfully') {
          navigate('/Login');
        }
      } catch (error) {
        setMessage('Registration failed');
      }
    }
  };

  return (
    <>
    <Nav />
    <div className="register-container">
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="registration-form-container">
      <p className="title"><center>Register</center></p>
        <form onSubmit={handleRegister} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} />Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`form-control ${userNameError ? 'is-invalid' : ''}`}
            />
            {userNameError && <p className="error-message">{userNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} />Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="dob">
            <FontAwesomeIcon icon={faCalendarDay} />Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={`form-control ${dateOfBirthError ? 'is-invalid' : ''}`}
            />
            {dateOfBirthError && <p className="error-message">{dateOfBirthError}</p>}
          </div>
          <div className="form-group">
            <label>
            <FontAwesomeIcon icon={faGenderless} />Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                /> Female
              </label>
            </div>
            {genderError && <p className="error-message">{genderError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} />Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
            <FontAwesomeIcon icon={faLock} />Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>
          <button type="submit" className="register-submit">
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
