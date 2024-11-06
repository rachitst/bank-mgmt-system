import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditCustomerControl.css'; 

const EditCustomerControl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const customerId = params.get('id'); 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [houseNo, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipCode] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`http://localhost:5000/customer/${customerId}`);
      const data = await response.json();
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setHouse(data.house_no);
      setCity(data.city);
      setZipCode(data.zipcode);
    };
    fetchCustomer();
  }, [customerId]);

  const handleSave = async () => {
    const updatedData = { name, phone, email, houseNo, city, zipcode };
    await fetch(`http://localhost:5000/customer/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    alert('Customer details updated');
    navigate('/customer-control'); 
  };

  return (
    <div className="edit-customer-container">
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
            value={houseNo}
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
          <button onClick={() => navigate('/customer-control')} className="btn cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerControl;
