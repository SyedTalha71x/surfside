import GridLines from "react-gridlines";
import LandingPage from "./pages/landing-page";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/layout";
import Home from "./pages/dashboard";
import Login from './pages/login'
import SignUpPage from "./pages/signup";
import ForgotPassword from './pages/forgot-password'
import VerifyOTP from "./pages/verify-otp";
import ResetPassword from './pages/reset-password'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="w-full min-h-screen bg-[#0B0D11] text-white !font-roboto">
            <GridLines className="grid-area" cellWidth={120} strokeWidth={0.1}>
              <Navbar />
              <main className="w-full min-h-screen">
                <LandingPage />
              </main>
            </GridLines>
            <Footer />
          </div>
        }

        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="reset-password" element={<ResetPassword />} />



        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;