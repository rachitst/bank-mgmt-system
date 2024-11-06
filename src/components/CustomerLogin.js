import React from 'react';
import customer from '../images/customer.png';
import './CustomerLogin.css';

const CustomerLogin = () => {
  return (
    <div className="customer-login-container">
      <h1 className="login-heading">Customer Login</h1>
      <div className="login-card">
        <img src={customer} alt="Customer" className="customer-image" />
        <form className="login-form" action='http://localhost:3000/customer'>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Login</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;