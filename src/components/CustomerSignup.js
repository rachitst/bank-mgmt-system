import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Name validation (2-100 characters, letters and spaces only)
    if (
      !name.trim() ||
      name.length < 2 ||
      name.length > 100 ||
      !/^[A-Za-z\s]+$/.test(name)
    ) {
      errors.name =
        "Name must be 2-100 characters long and contain only letters";
    }

    // Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 100) {
      errors.email = "Please enter a valid email address";
    }

    // House number validation (not empty and max 50 chars)
    if (!houseNo.trim() || houseNo.length > 50) {
      errors.houseNo =
        "House number is required and must be less than 50 characters";
    }

    // City validation (letters and spaces only, max 50 chars)
    if (!city.trim() || !/^[A-Za-z\s]+$/.test(city) || city.length > 50) {
      errors.city =
        "City must contain only letters and be less than 50 characters";
    }

    // Zipcode validation (5-10 characters)
    if (!/^\d{5,10}$/.test(zipcode)) {
      errors.zipcode = "Zipcode must be between 5-10 digits";
    }

    // Username validation (3-50 characters, alphanumeric)
    if (
      !username.trim() ||
      username.length < 3 ||
      username.length > 50 ||
      !/^[A-Za-z0-9]+$/.test(username)
    ) {
      errors.username =
        "Username must be 3-50 characters and contain only letters and numbers";
    }

    // Password validation (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      errors.password =
        "Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setValidationErrors({});

    // Validate form before submission
    if (!validateForm()) {
      return;
    }
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
      <div className="login-card" style={{ width: "900px" }}>
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
              className={`form-control ${
                validationErrors.name ? "is-invalid" : ""
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className={`form-control ${
                validationErrors.phone ? "is-invalid" : ""
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {validationErrors.phone && (
              <div className="invalid-feedback">{validationErrors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${
                validationErrors.email ? "is-invalid" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">House No.</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.houseNo ? "is-invalid" : ""
              }`}
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              required
            />
            {validationErrors.houseNo && (
              <div className="invalid-feedback">{validationErrors.houseNo}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.city ? "is-invalid" : ""
              }`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            {validationErrors.city && (
              <div className="invalid-feedback">{validationErrors.city}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Zipcode</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.zipcode ? "is-invalid" : ""
              }`}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
            {validationErrors.zipcode && (
              <div className="invalid-feedback">{validationErrors.zipcode}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.username ? "is-invalid" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {validationErrors.username && (
              <div className="invalid-feedback">
                {validationErrors.username}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                validationErrors.password ? "is-invalid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {validationErrors.password && (
              <div className="invalid-feedback">
                {validationErrors.password}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Sign Up
          </button>
          <Link to="/customer/login" className="btn btn-primary btn-lg ms-2 mt-2">
        Go to Login
      </Link>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
