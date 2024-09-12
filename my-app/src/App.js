import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailWarning, setEmailWarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailWarning('Invalid email format!');
      setSuccessMessage('');
      return;
    } else {
      setEmailWarning('');
    }

    // Check if password is not empty
    if (password === '') {
      setSuccessMessage('');
      setEmailWarning('Password cannot be empty!');
      return;
    }

    setSuccessMessage('You have successfully logged in!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login </h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Email Field */}
          <InputField
            label="Email:"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {emailWarning && <WarningMessage message={emailWarning} />}

          {/* Password Field */}
          <InputField
            label="Password:"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {/* Login Button */}
          <input type="submit" value="Login" className="submit-button" />

          {/* Success Message */}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </header>
    </div>
  );
}

// Reusable Input Field Component
const InputField = ({ label, type, id, value, onChange }) => (
  <div className="input-container">
    <label htmlFor={id} className="label">{label}</label>
    <input type={type} id={id} value={value} onChange={onChange} className="input" />
  </div>
);

// Reusable Warning Message Component
const WarningMessage = ({ message }) => (
  <span className="warning-message">{message}</span>
);

export default App;
