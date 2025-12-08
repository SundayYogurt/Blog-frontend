import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-neutral">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};