/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Dashboardlayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#11131A] via-[#171A23] to-[#0B0D11] p-4">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 md:px-4 px-0 py-8 md:p-6 p-2 mt-10 md:mt-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
