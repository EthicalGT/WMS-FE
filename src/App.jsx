import "./App.css";

import ActionContainer from "./components/ActionContainer";
import OtpVerificationContainer from "./components/OtpVerificationContainer";
import SuccessVerificationContainer from "./components/VerificationSuccessContainer";
import { Routes, Route } from "react-router-dom";
import HawkerDashboardContainer from "./components/HawkerDashboardContainer";
import SupervisorDashboardContainer from "./components/SupervisorDashboardContainer";
import VendorDashboardContainer from "./components/VendorDashboardContainer";
import AdminPanelContainer from "./components/AdminPanelContainer";

function App() {
  return (
    <>
      <Routes>
        {/* Universal Routes*/}
        <Route path="/verify_otp" element={<OtpVerificationContainer />} />
        <Route path="/" element={<ActionContainer />} />
        <Route path="/success_otp" element={<SuccessVerificationContainer />} />

        {/* Hawker Routes*/}
        <Route
          path="/vendor/dashboard"
          element={<VendorDashboardContainer />}
        />

        {/* Vendor Routes*/}

        <Route
          path="/hawker/dashboard"
          element={<HawkerDashboardContainer />}
        />
        {/* Supervisor Routes*/}
        <Route
          path="/supervisor/dashboard"
          element={<SupervisorDashboardContainer />}
        />
        {/* Administrator Routes*/}
        <Route path="/admin/dashboard" element={<AdminPanelContainer />} />
      </Routes>
    </>
  );
}

export default App;
