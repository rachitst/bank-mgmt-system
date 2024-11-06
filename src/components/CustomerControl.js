import React, { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';
import './CustomerControl.css';
import { useNavigate } from 'react-router-dom';

const CustomerControl = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [houseNo, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [username, setUsername] = useState('');
  const [myAccounts, setAccounts] = useState([]);
  const [currentBalance, setBalance] = useState('');
  const [allTransactions, setTransaction] = useState([]);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const SaveChanges = async () => {
    try {
      const body = { name, phone, email, houseNo, city, zipcode };
      const query = await fetch(`http://localhost:5000/customer/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (query.ok) {
        alert('Details updated successfully');
        setIsEditing(false);  // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };


  const DeleteAccount = async (accountId) => {
    try {
      await fetch(`http://localhost:5000/accounts/${accountId}`, {
        method: 'DELETE',
      });
      alert('Account deleted successfully');
      setAccounts((prev) => prev.filter((account) => account.account_id !== accountId));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const AddAccount = async () => {
    if (!currentBalance || isNaN(currentBalance)) {
      alert('Please enter a valid balance');
      return;
    }

    try {
      const body = { customer_id: id, current_balance: currentBalance };
      const query = await fetch('http://localhost:5000/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (query.ok) {
        alert('Account added successfully');
        GetAccountDetails();
      }
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const GetAccountDetails = async () => {
    try {
      const query = await fetch(`http://localhost:5000/accounts/${id}`);
      const data = await query.json();
      setAccounts(data);
      setShowAccountDetails(true);
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  const GetTransactions = async () => {
    try {
      const query = await fetch(`http://localhost:5000/transaction/${id}`);
      const data = await query.json();
      setTransaction(data);
      setShowTransactions(true);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const GetCustomer = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const usernameParam = params.get('username');
      const query = await fetch(`http://localhost:5000/customer/${usernameParam}`);
      const data = await query.json();
      setID(data.customer_id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setHouse(data.house_no);
      setCity(data.city);
      setZipCode(data.zipcode);
      setUsername(data.username);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    GetCustomer();
  }, []);

  const handleEditClick = () => {
    // Redirect to the EditCustomerControl page when "Edit" is clicked
    navigate(`/customer/edit?id=${id}`);
  };

  return (
    <div className="customer-control-container" style={{ height: '100vh', overflowY: 'auto' }}>
      {/* Header Section */}
      <div className="header-section">
        <h1>Customer Details</h1>
        <img src={avatar} alt="Customer Avatar" className="customer-avatar" />
        <h3 className="username">@{username}</h3>
      </div>

      {/* Personal Details Section */}
      <div className="personal-details-section">
        <h2>Personal Details</h2>
        <div className="detail-item">
          <label>Customer ID:</label>
          <input type="text" value={id} readOnly />
        </div>
        <div className="detail-item">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="detail-item">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="detail-item">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="detail-item">
          <label>House No:</label>
          <input
            type="text"
            value={houseNo}
            onChange={(e) => setHouse(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="detail-item">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="detail-item">
          <label>Zipcode:</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
        <div className="buttons">
        {/* Toggle between Edit and Cancel button */}
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button> // Enable editing in-place
        ) : (
          <>
            <button onClick={() => setIsEditing(false)}>Cancel</button> {/* Cancel editing */}
            <button onClick={SaveChanges}>Save</button> {/* Save changes in-place */}
          </>
        )}
      </div>
    </div>

      {/* Actions Section */}
      <div className="actions-section">
        <button
          onClick={() => document.getElementById('addAccountForm').classList.toggle('visible')}
          className="mr-4"
          style={{ marginRight: '20px', marginBottom: '20px' }}
        >
          Create Account
        </button>
        <button onClick={handleEditClick} className="mr-4" style={{ marginRight: '20px', marginBottom: '20px' }}>
          Edit Customer
        </button>
        <button onClick={GetAccountDetails} className="mr-4" style={{ marginRight: '20px', marginBottom: '20px' }}>
          Get Account Details
        </button>
        <button onClick={GetTransactions} className="mr-4" style={{ marginRight: '20px', marginBottom: '20px' }}>
          View Transactions
        </button>
      </div>

      {/* Add Account Form */}
      <div id="addAccountForm" className="form-section account-card">
        <h3>Add New Account</h3>
        <div className="account-detail">
          <label>Balance:</label>
          <input
            type="number"
            placeholder="Enter initial balance"
            value={currentBalance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <button onClick={AddAccount}>Add Account</button>
      </div>


      {/* Account Details Section */}
      {showAccountDetails && (
        <div className="accounts-section">
          <h3>Your Accounts</h3>
          <div className="accounts-container">
            {myAccounts.map((account, index) => (
              <div key={account.account_id} className="account-card">
                <h3>Account #{index + 1}</h3>
                <div className="account-detail">
                  <label>Account No:</label>
                  <input type="text" value={account.account_id} readOnly />
                </div>
                <div className="account-detail">
                  <label>Balance:</label>
                  <input type="text" value={account.current_balance} readOnly />
                </div>
                <div className="account-detail">
                  <label>Date Opened:</label>
                  <input type="text" value={new Date(account.created_at).toLocaleString()} readOnly />
                </div>
                <div className="buttons">
                  <button type="button" style={{ marginRight: '10px', marginBottom: '20px' }}>Transaction</button>
                  <button type="button" className="delete-button" onClick={() => DeleteAccount(account.account_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions Section */}
      {showTransactions && (
        <div className="transactions-section">
          <h3>Your Transactions</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Account ID</th>
                  <th>Action</th>
                  <th>Amount</th>
                  <th>Branch ID</th>
                  <th>Date of Transaction</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.transaction_id}</td>
                    <td>{transaction.account_id}</td>
                    <td>{transaction.action}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.branch_id}</td>
                    <td>{new Date(transaction.transaction_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerControl;