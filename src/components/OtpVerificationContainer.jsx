import React, { useEffect, useState } from "react";
import "../assets/css/OtpVerificationContainer.css";
import { verifyOTP } from "../api/otp_verify";
import { getCurrentVerificationUser } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerificationContainer = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const showError = (msg) => toast.error(msg);
  const showSuccess = (msg) => toast.success(msg);

  // Allow only A-Z, a-z, 0-9
  const isValidChar = (char) => /^[a-zA-Z0-9]$/.test(char);

  const handleChange = (e, index) => {
    if (sessionExpired) return;

    const value = e.target.value;
    if (value && !isValidChar(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (sessionExpired) {
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }

    if (
      !/[a-zA-Z0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  // 🔍 Check session
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentVerificationUser();

        if (res?.success && res?.data?.status === "success") {
          setEmail(res.data.data);
        } else {
          setSessionExpired(true);
          showError(
            "No active OTP session found. Please register again after 10 minutes."
          );

          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      } catch (error) {
        setSessionExpired(true);
        showError("Something went wrong. Redirecting to home...");

        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      } finally {
        setCheckingSession(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionExpired) return;

    const myotp = otp.join("");

    if (myotp.length !== 6) {
      showError("Please enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOTP({ otp: myotp });

      if (res?.data?.status === "success") {
        showSuccess("OTP verified successfully");

        setTimeout(() => {
          window.location.href = res.data.redirectTo;
        }, 1500);
      } else {
        showError(res?.data?.message || "OTP verification failed");
      }
    } catch (error) {
      showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (sessionExpired) return;
    showSuccess("OTP has been resent!");
  };

  // ⏳ Loading screen
  if (checkingSession) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="otp-container">
          <div className="otp-card">
            <h3>Checking session...</h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="otp-container">
        <div className="otp-card">
          <div className="otp-icon">🔒</div>
          <h2>Verify OTP</h2>
          <p>Enter the 6-digit code sent to your</p>
          <p className="phone-number">{email || "—"}</p>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  disabled={sessionExpired || loading}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button
              type="submit"
              className="verify-btn"
              disabled={sessionExpired || loading}
              style={{
                opacity: sessionExpired ? 0.6 : 1,
                cursor: sessionExpired ? "not-allowed" : "pointer",
              }}
            >
              {sessionExpired
                ? "Session Expired"
                : loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </form>

          <p className="resend-text">
            Didn't receive the OTP?{" "}
            <span
              className="resend-btn"
              onClick={handleResend}
              style={{
                pointerEvents: sessionExpired ? "none" : "auto",
                opacity: sessionExpired ? 0.5 : 1,
              }}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpVerificationContainer;
