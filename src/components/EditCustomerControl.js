import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditCustomerControl.css'; 
import avatar from '../images/avatar.png';

const EditCustomerControl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username'); 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [house_no, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipCode] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`http://localhost:5000/customer/${username}`);
      const data = await response.json();
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setHouse(data.house_no);
      setCity(data.city);
      setZipCode(data.zipcode);
    };
    fetchCustomer();
  }, [username]);

  const handleSave = async () => {
    const updatedData = { name, phone, email, house_no, city, zipcode };
    await fetch(`http://localhost:5000/customer/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    alert('Customer details updated');
    navigate(`/customer/?username=${username}`); 
  };

  return (
    <div className="edit-customer-container" style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="header-section">
        <h1>Customer Details</h1>
        <img src={avatar} alt="Customer Avatar" className="customer-avatar" />
        <h3 className="username">@{username}</h3>
      </div>
      <div className="card">
        <h1>Edit Customer Details</h1>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>House No:</label>
          <input
            type="text"
            value={house_no}
            onChange={(e) => setHouse(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Zipcode:</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSave} className="btn save-btn">
            Save Changes
          </button>
          <button onClick={() => navigate(`/customer?username=${username}`)} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerControl;
