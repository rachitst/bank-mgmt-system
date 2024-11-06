import React, { useState } from 'react';
import employee from '../images/employee.png';
import './EmployeeLogin.css';

const EmployeeLogin = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    const body = { username, password };
    console.log(body);
  };

  return (
    <div className="employee-login-container">
      <h1 className="login-heading">Employee Login</h1>
      <div className="login-card">
        <img src={employee} alt="Employee" className="employee-image" />
        <form className="login-form" onSubmit={handleEmployeeLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={(e) => setUserName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Login</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
