import React, { useState } from "react";
import "../assets/css/ActionContainer.css";
import user from "../assets/img/user.png";
import { registerHawkerUser, loginHawkerUser, registerVendorUser, loginVendorUser } from "../api/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Mail,
  Lock,
  User,
  Phone,
  Hash,
  MapPin,
  Layers,
  Building2,
  Store
} from "lucide-react";

function ActionContainer() {

  const[loading,setLoading]=useState("false");
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
    product_category: "",
    gst_number: "",
    Firm_name: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });


  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
  ];


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
    zone: /^[A-Za-z0-9 ]{2,30}$/
  };

  /* ---------- TOAST ---------- */
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
    if (!regex.full_name.test(signupData.full_name)) return showError("Invalid full name"), false;
    if (!regex.phone_number.test(signupData.phone_number)) return showError("Invalid phone number"), false;
    if (!regex.email.test(signupData.email)) return showError("Invalid email"), false;
    if (!regex.password.test(signupData.password))
      return showError("Password must contain uppercase, lowercase, number & special char"), false;
    if (!regex.aadhar_number.test(signupData.aadhar_number)) return showError("Invalid Aadhaar"), false;
    if (!regex.city.test(signupData.city)) return showError("Invalid city"), false;
    if (!regex.state.test(signupData.state)) return showError("Invalid state"), false;
    if (!regex.pincode.test(signupData.pincode)) return showError("Invalid pincode"), false;
    if (!regex.zone.test(signupData.zone)) return showError("Invalid zone"), false;
    return true;
  };

  const validateLogin = () => {
    if (!regex.email.test(loginData.email)) return showError("Invalid email"), false;
    if (loginData.password.length < 8) return showError("Password too short"), false;
    return true;
  };

  /* ---------- SUBMIT ---------- */
  const handleSignupSubmitHawker = async (e) => {
  e.preventDefault();
  if (!validateSignup()) return;

  const res = await registerHawkerUser({ ...signupData, role });

  if (res.status === "success") {
    showSuccess(res.message || "Registration successful.");

    if (res.redirectTo) {
      window.location.href = res.redirectTo;
    }
  } else {
    showError(res?.message || "Registration failed");
  }
};


const handleLoginSubmitHawker = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    
    const res = await loginHawkerUser({ ...loginData, role });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      showSuccess("Login successful.");
    } else {
      showError(res.message || "Login failed");
    }
  };


const handleSignupSubmitVendor = async (e) => {
  e.preventDefault();
  if (!validateSignup()) return;

  const res = await registerVendorUser({ ...signupData, role });

  if (res.status === "success") {
    showSuccess(res.message || "Registration successful.");

    if (res.redirectTo) {
      window.location.href = res.redirectTo;
    }
  } else {
    showError(res?.message || "Registration failed");
  }
};


  const handleLoginSubmitVendor = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const res = await loginVendorUser({ ...loginData, role });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      showSuccess("Login successful.");
    } else {
      showError(res.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />

      <div className="card">
        <div className="card-header">
          <h2>{currentState}</h2>
          <p>HMS service usage needs authentication kindly verify with your credentials.</p>
        </div>

        <div className="tabs">
          <button className={activeTab === "signup" ? "tab active" : "tab"} onClick={() => setActiveTab("signup")}>Sign Up</button>
          <button className={activeTab === "signin" ? "tab active" : "tab"} onClick={() => setActiveTab("signin")}>Sign In</button>
        </div>

        <div className="roles">
          <button className={role === "hawker" ? "role active" : "role"} onClick={() => setRole("hawker")}>Hawker</button>
          <button className={role === "vendor" ? "role active" : "role"} onClick={() => setRole("vendor")}>Vendor</button>
        </div>

        <div className="photo-upload">
          <label className="photo-circle">
            <img src={user} alt="Profile" />
          </label>
        </div>

        {/* ---------- SIGN UP ---------- */}
        {activeTab === "signup" && (
          <form className="form" onSubmit={role === "hawker" 
    ? handleSignupSubmitHawker 
    : handleSignupSubmitVendor}>
            <h4>PERSONAL DETAILS</h4>

            <div className="input-group"><User className="input-icon" /><input name="full_name" placeholder="Full Name" onChange={handleSignupChange} /></div>
            <div className="input-group"><Phone className="input-icon" /><input name="phone_number" placeholder="Phone Number" maxLength={10} onChange={handleSignupChange} /></div>
            <div className="input-group"><Mail className="input-icon" /><input name="email" type="email" placeholder="Email" onChange={handleSignupChange} /></div>
            <div className="input-group"><Lock className="input-icon" /><input name="password" type="password" placeholder="Password" onChange={handleSignupChange} /></div>

            <h4>IDENTITY</h4>
            <div className="input-group"><Hash className="input-icon" /><input name="aadhar_number" placeholder="Aadhaar Number" maxLength={12} onChange={handleSignupChange} /></div>

            <h4>ADDRESS</h4>
            <textarea name="address" placeholder="Address" onChange={handleSignupChange}></textarea>

            <div className="input-group"><MapPin className="input-icon" /><input name="city" placeholder="City" onChange={handleSignupChange} /></div>
            <div className="input-group"><MapPin className="input-icon" /><input name="pincode" placeholder="Pincode" maxLength={6} onChange={handleSignupChange} /></div>
            <div className="input-group" id='stateSelector'>
              <MapPin className="input-icon" />
              <select name="state" onChange={handleSignupChange} defaultValue="">
                <option value="" disabled>Select State / UT</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="input-group"><MapPin className="input-icon" /><input name="zone" placeholder="Zone" onChange={handleSignupChange} /></div>

            {role === "vendor" && (
              <>
                <h4>BUSINESS DETAILS</h4>

                <div className="input-group">
                  <Layers className="input-icon" />
                  <select name="product_category" value={signupData.product_category} onChange={handleSignupChange}>
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
                </div>

                <div className="input-group"><Building2 className="input-icon" /><input name="gst_number" placeholder="GST Number" maxLength={15} onChange={handleSignupChange} /></div>
                <div className="input-group"><Store className="input-icon" /><input name="Firm_name" placeholder="Firm Name" onChange={handleSignupChange} /></div>
              </>
            )}

            <button className="submit-btn">Register as {role}</button>
          </form>
        )}

        {/* ---------- SIGN IN ---------- */}
        {activeTab === "signin" && (
          <form className="form" 

          onSubmit={role === "hawker" 
    ? handleLoginSubmitHawker 
    : handleLoginSubmitVendor}>
            <h4>VERIFY CREDENTIALS</h4>
            <div className="input-group"><Mail className="input-icon" /><input name="email" type="email" placeholder="Email" onChange={handleLoginChange} /></div>
            <div className="input-group"><Lock className="input-icon" /><input name="password" type="password" placeholder="Password" onChange={handleLoginChange} /></div>
            <button className="submit-btn">Login as {role}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ActionContainer;
