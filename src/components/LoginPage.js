import customer from '../images/customer.png';
import employee from '../images/employee.png';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container"> 
      <h1 className="typing-animation" style={{ marginBottom: '40px' }}>
        Welcome to the Bank Management System!
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-5 col-sm-10 mb-4">
          <div className="card text-black bg-white shadow-lg animated-card" style={{ marginBottom: '30px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Customer</h3>
              <button className="btn btn-outline-success" onClick={() => navigate('/customer/login')}>Login</button>
            </div>
            <div className="card-body text-center">
              <img src={customer} alt="Customer" height="150px" className="rounded mx-auto d-block mt-3" />
            </div>
          </div>
        </div>
        <div className="col-md-5 col-sm-10 mb-4">
          <div className="card text-black bg-white shadow-lg animated-card" style={{ marginBottom: '30px' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Employee</h3>
              <button className="btn btn-outline-success" onClick={() => navigate('/employee/login')}>Login</button>
            </div>
            <div className="card-body text-center">
              <img src={employee} alt="Employee" height="150px" className="rounded mx-auto d-block mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;