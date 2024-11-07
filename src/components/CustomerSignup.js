import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customer from "../images/customer.png";
import "./CustomerSignup.css";

const CustomerSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:5000/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          houseNo,
          city,
          zipcode,
          username,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "An error occurred. Please try again.");
        return;
      }

      // If registration successful, navigate to login page
      navigate(`/customer?username=${username}`);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div
      className="customer-login-container"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="login-card">
        <img src={customer} alt="Customer" className="customer-image" />
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">House No.</label>
            <input
              type="text"
              className="form-control"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Zipcode</label>
            <input
              type="text"
              className="form-control"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
