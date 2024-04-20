import React, { useState } from 'react';
import Main from './Main'; // Import the Main component
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    if (username === 'vipervenom' && password === 'blackfly') {
      console.log('Login Successful!');
      setLoginError('');
      setIsLoggedIn(true); // Set login status to true
    } else {
      setLoginError('Invalid username or password');
      setUsername(''); // Clear username field
      setPassword(''); // Clear password field
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='app-container'>
      {isLoggedIn ? (
        <Main />
      ) : (
        <div className='login-container'>
          <h2 className='loginText'>Login To VControl Dashboard</h2>
          <div className='input-group'>
            <label>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress} // Attach event listener for Enter key
            />
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Attach event listener for Enter key
            />
          </div>
          {loginError && <p className='error-message'>{loginError}</p>}
          <button className='buttonText' onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
