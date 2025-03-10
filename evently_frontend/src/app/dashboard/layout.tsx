"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DashboardLayoutProps = {
          children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
          const router = useRouter();
          const [activeTab, setActiveTab] = useState("Dashboard");
          const [sidebarOpen, setSidebarOpen] = useState(false);

          useEffect(() => {
                    const savedTab = localStorage.getItem("activeTab");
                    if (savedTab) {
                              setActiveTab(savedTab);
                    }
          }, []);


          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const handleTabChange = (tabName: string, _view: string) => {
                    setActiveTab(tabName);
                    localStorage.setItem("activeTab", tabName);
                    router.push(`/dashboard/${tabName.toLowerCase()}`);
          };

          return (
                    <div className="flex h-screen">
                              {/* Sidebar */}
                              <div className="w-64">
                                        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} handleTabChange={handleTabChange} />
                              </div>

                              {/* Main Content */}
                              <div className="flex-1 flex flex-col bg-gray-100 text-gray-900">
                                        {/* Mobile Navbar */}
                                        <header className="flex items-center justify-between bg-gray-800 p-4 lg:hidden">
                                                  <button className="text-white" onClick={() => setSidebarOpen(true)}>
                                                            <FaBars size={28} />
                                                  </button>
                                                  <h1 className="text-lg font-bold">Dashboard</h1>
                                        </header>

                                        {/* Content Area */}
                                        <main className="flex-grow p-6 overflow-y-auto">{children}</main>

                                        {/* Toast Notifications */}
                                        <ToastContainer />
                              </div>
                    </div>
          );
};

export default DashboardLayout;
