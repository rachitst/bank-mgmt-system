import React from 'react';
import LoginPage from './components/LoginPage';
import CustomerLogin from './components/CustomerLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeControl from './components/EmployeeControl';
import PostEmployee from './components/AdminEmployee';
import PostCustomer from './components/AdminCustomer';
import CustomerControl from './components/CustomerControl';
import PostBranch from './components/AdminBranch';
import Transaction from './components/Transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/customer/login' element={<CustomerLogin />} />
        <Route path='/employee/login' element={<EmployeeLogin />} />
        <Route path='/employee' element={<EmployeeControl />} />
        <Route path='/admin/employee' element={<PostEmployee />} />
        <Route path='/admin/customer' element={<PostCustomer />} />
        <Route path='/admin/branch' element={<PostBranch />} />
        <Route path='/customer' element={<CustomerControl />} />
        <Route path='/customer/transaction' element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
