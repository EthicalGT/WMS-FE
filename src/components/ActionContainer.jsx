import React, { useState } from "react";
import "../assets/css/ActionContainer.css";
import user from "../assets/img/user.png";
import { registerHawkerUser, loginHawkerUser } from "../api/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActionContainer() {
  const [activeTab, setActiveTab] = useState("signin");
  const [role, setRole] = useState("hawker");
  const currentState = activeTab === "signin" ? "HMS Sign In" : "HMS Sign Up";




  const [signupData, setSignupData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    aadhar_number: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    zone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /* ---------- REGEX ---------- */
  const regex = {
    full_name: /^[A-Za-z ]{3,50}$/,
    phone_number: /^[6-9]\d{9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    aadhar_number: /^\d{12}$/,
    city: /^[A-Za-z ]{2,50}$/,
    state: /^[A-Za-z ]{2,50}$/,
    pincode: /^\d{6}$/,
    zone: /^[A-Za-z0-9 ]{2,30}$/,
  };

  /* ---------- TOAST HELPERS ---------- */
  const showError = (msg) => toast.error(msg);
  const showSuccess = (msg) => toast.success(msg);

  /* ---------- HANDLERS ---------- */
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  /* ---------- VALIDATIONS ---------- */
  const validateSignup = () => {
    if (!regex.full_name.test(signupData.full_name))
      return showError("Invalid full name"), false;

    if (!regex.phone_number.test(signupData.phone_number))
      return showError("Invalid phone number"), false;

    if (!regex.email.test(signupData.email))
      return showError("Invalid email address"), false;

    if (!regex.password.test(signupData.password))
      return showError(
        "Password must have uppercase, lowercase, number & special character"
      ),
        false;

    if (!regex.aadhar_number.test(signupData.aadhar_number))
      return showError("Aadhaar must be 12 digits"), false;

    if (!regex.city.test(signupData.city))
      return showError("Invalid city"), false;

    if (!regex.state.test(signupData.state))
      return showError("Invalid state"), false;

    if (!regex.pincode.test(signupData.pincode))
      return showError("Invalid pincode"), false;

    if (!regex.zone.test(signupData.zone))
      return showError("Invalid zone"), false;

    return true;
  };

  const validateLogin = () => {
    if (!regex.email.test(loginData.email))
      return showError("Invalid email"), false;

    if (loginData.password.length < 8)
      return showError("Password too short"), false;

    return true;
  };

  /* ---------- SUBMITS ---------- */
  const handleSignupSubmitHawker = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    const res = await registerHawkerUser({ ...signupData, role });
    res?.success ? showSuccess("Registration successful 🎉") : showError(res.message);
  };

  const handleLoginSubmitHawker = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const res = await loginHawkerUser({ ...loginData, role });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      showSuccess("Login successful 🚀");
    } else {
      showError(res.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        pauseOnHover
      />

      <div className="card">
        <div className="card-header">
          <h2>{currentState}</h2>
          <p>HMS service usage needs authentication kindly verify with your credentials.</p>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "signup" ? "tab active" : "tab"}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={activeTab === "signin" ? "tab active" : "tab"}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
        </div>

        <div className="roles">
          <button
            className={role === "hawker" ? "role active" : "role"}
            onClick={() => setRole("hawker")}
          >
            Hawker
          </button>
          <button
            className={role === "vendor" ? "role active" : "role"}
            onClick={() => setRole("vendor")}
          >
            Vendor
          </button>
        </div>

        <div className="photo-upload">
          <label className="photo-circle">
            <img src={user} alt="Profile" />
          </label>
        </div>

        {activeTab === "signup" && (
          <form className="form" onSubmit={handleSignupSubmitHawker}>
            <h4>PERSONAL DETAILS</h4>

            <input name="full_name" placeholder="Full Name" onChange={handleSignupChange} />
            <input name="phone_number" placeholder="Phone Number" onChange={handleSignupChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleSignupChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleSignupChange} />

            <h4>IDENTITY</h4>
            <input name="aadhar_number" placeholder="Aadhaar Number" onChange={handleSignupChange} />

            <h4>ADDRESS</h4>
            <textarea name="address" placeholder="Address" onChange={handleSignupChange}></textarea>

            <input name="city" placeholder="Prefered_city" onChange={handleSignupChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleSignupChange} />
            <input name="state" placeholder="State" onChange={handleSignupChange} />
            <input name="zone" placeholder="Zone" onChange={handleSignupChange} />
            {role === "vendor" && (
              <>
                <h4>BUSINESS DETAILS</h4>
                <select
                  name="product_category"
                  value={signupData.product_category}
                  onChange={handleSignupChange}
                >
                  <option value="">Select Product Category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="beverage">Beverage</option>
                  <option value="street_food">Street Food</option>
                  <option value="snacks">Snacks</option>
                  <option value="fruits">Fruits</option>
                  <option value="dairy_product">Dairy Product</option>
                  <option value="bakery_item">Bakery Item</option>
                  <option value="meat_seafood">Meat & Seafood</option>
                  <option value="flowers">Flowers</option>
                  <option value="groceries">Groceries</option>
                  <option value="sweet">Sweet</option>
                  <option value="spices">Spices</option>
                </select>


                <input
                  name="gst_number"
                  placeholder="GST Number"
                  onChange={handleSignupChange}
                />

                <input
                  name="Firm_name"
                  placeholder="Firm name"
                  onChange={handleSignupChange}
                />
              </>
            )}

            <button className="submit-btn">Register as {role}</button>
          </form>
        )}

        {activeTab === "signin" && (
          <form className="form" onSubmit={handleLoginSubmitHawker}>
            <h4>VERIFY CREDENTIALS</h4>

            <input name="email" type="email" placeholder="Email" onChange={handleLoginChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleLoginChange} />

            <button className="submit-btn">Login as {role}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ActionContainer;
