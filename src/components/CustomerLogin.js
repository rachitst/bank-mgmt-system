import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customer from '../images/customer.png';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // First, check if the customer exists
      const customerResponse = await fetch(`http://localhost:5000/customer/${username}`);
      const customerData = await customerResponse.json();

      if (customerResponse.status === 404) {
        setError('Invalid username or password');
        return;
      }

      // Now verify the password
      const loginResponse = await fetch('http://localhost:5000/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        const data = await loginResponse.json();
        setError(data.message || 'Invalid username or password');
        return;
      }

      // If login successful, navigate to customer page
      navigate(`/customer/?username=${username}`);
      
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="customer-login-container">
      <h1 className="login-heading">Customer Login</h1>
      <div className="login-card">
        <img src={customer} alt="Customer" className="customer-image" />
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;