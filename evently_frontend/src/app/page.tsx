"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import EventsPage from "./dashboard/events/page";
import { Menu } from "lucide-react"; // Import an icon for the menu button

export default function Home() {
  // Sidebar State Management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 gap-8 items-center justify-center">
        {/* Sidebar Toggle Button (Visible on Small Screens) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-2 left-2 z-50 md:hidden bg-gray-800 text-white p-2 rounded-full shadow-md"
        >
          <Menu size={24} />
        </button>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link
            href="/dashboard/events"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            View Events
          </Link>
        </div>

        {/* Events Section */}
        <div className="w-full px-4 sm:px-8">
          <EventsPage />
        </div>
      </main>

      {/* Footer Section */}
      {/* <footer className="w-full flex justify-center text-center py-6">
        <Footer />
      </footer> */}
    </div>
  );
}
