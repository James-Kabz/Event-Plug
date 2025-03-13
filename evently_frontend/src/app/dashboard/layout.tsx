"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "lucide-react";

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
        <div className="flex min-h-screen">
            {/* Sidebar Section */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0 md:w-72`}
            >
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 gap-8 items-center justify-center">
                {/* Sidebar Toggle Button (Visible on Small Screens) */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed top-2 left-2 z-50 md:hidden bg-gray-800 text-white p-2 rounded-full shadow-md"
                >
                    <Menu size={24} />
                </button>

                {/* Content Area */}
                <main className="w-full px-4 sm:px-8">{children}</main>

                {/* Toast Notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default DashboardLayout;
