import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerControl.css';
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
  const navigate = useNavigate(); 
  const [showWithdrawalData, setShowWithdrawalData] = useState(true); // Show withdrawal data by default
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [withdrawalLogs, setWithdrawalLogs] = useState([]);
  const location = useLocation();
  const { username } = location.state || {};

  console.log("username",username);
  const goToDashboard = () => {
    navigate(`/customer?username=${username} `);
  };

  const fetchWithdrawalData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/customer/withdrawals/${username}`);
      const data = await response.json();
      setWithdrawalData(data);
    } catch (error) {
      console.error('Error fetching withdrawal data:', error);
    }
  };

  const fetchWithdrawalLogs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/customer/withdrawal-logs/${username}`);
      const data = await response.json();
      setWithdrawalLogs(data);
    } catch (error) {
      console.error('Error fetching withdrawal logs:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawalData();
    fetchWithdrawalLogs();
  }, []);

  return (
    <div className="withdrawal-section customer-control-container">
      <div className="header-section">
        <h2>Withdrawal Page</h2>
      </div>
      <div className="actions-section">
        <button
          onClick={() => setShowWithdrawalData(true)}
          className="mr-4"
          style={{ marginRight: "20px", marginBottom: "20px" }}
        >
          Show Withdrawal Data
        </button>
        <button
          onClick={() => setShowWithdrawalData(false)}
          className="mr-4"
          style={{ marginRight: "20px", marginBottom: "20px" }}
        >
          Show Withdrawal Logs
        </button>

        <button
          className=""
          onClick={goToDashboard}
          style={{ marginRight: "20px", marginBottom: "20px" }}
        >
          Go to Dashboard
        </button>
      </div>

      {showWithdrawalData ? (
        <div className="transactions-section">
          <h3>Withdrawal Data for {username}</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.account_id}</td>
                    <td>{item.transaction_id}</td>
                    <td>{item.amount}</td>
                    <td>{new Date(item.transaction_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="transactions-section">
          <h3>Withdrawal Logs for {username}</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Log ID</th>
                  <th>Action</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalLogs?.map((log, index) => (
                  <tr key={index}>
                    <td>{log.id}</td>
                    <td>{log.log_id}</td>
                    <td>{log.action}</td>
                    <td>{log.amount}</td>
                    <td>{new Date(log.log_timestamp).toLocaleString()}</td>
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

export default Withdrawal;