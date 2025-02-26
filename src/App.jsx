import GridLines from "react-gridlines";
import LandingPage from "./pages/landing-page";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/layout";
import Home from "./pages/dashboard";
import Login from './pages/login'

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
        <Route path="login" element={<Login/>}/>


        {/* Dashboard routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;