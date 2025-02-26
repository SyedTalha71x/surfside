/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Dashboardlayout = () => {
  return (
    <div className="min-h-screen bg-[#0B0D11] p-4">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-8 md:p-6 p-2 mt-5 md:mt-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
