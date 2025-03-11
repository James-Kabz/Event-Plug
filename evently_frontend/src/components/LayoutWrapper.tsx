"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
    router.push(`/${tabName.toLowerCase()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed md:relative w-64 bg-gray-100 border-r border-gray-300 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} handleTabChange={handleTabChange} />
      </aside>

      {/* Mobile Navbar */}
      <header className="flex items-center justify-between bg-gray-800 p-4 md:hidden">
        <button className="text-white" onClick={() => setSidebarOpen(true)}>
          <FaBars size={28} />
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="col-span-3 p-6 w-full">{children}</main>
    </div>
  );
}
