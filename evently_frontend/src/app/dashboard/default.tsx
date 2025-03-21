"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "lucide-react";
import {
    FaUsers,
    FaWpforms,
    FaPowerOff,
    FaChevronDown,
    FaChevronUp,
    FaRegCalendarCheck,
} from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { PiUserCircleGearDuotone } from "react-icons/pi";
import api from "../../../lib/axios";
import { showToast } from "@/components/ToastMessage";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
    const [permissionsDropdownOpen, setPermissionsDropdownOpen] = useState(false);

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        localStorage.setItem("activeTab", tabName);
        router.push(`/dashboard/${tabName.toLowerCase()}`);
    };

    const handleLogout = async () => {
        try {
            // Ensure CSRF token is set before making the logout request
            await api.get("sanctum/csrf-cookie", { withCredentials: true });

            const res = await api.post("logout", {}, { withCredentials: true });

            if (res.status >= 200 && res.status < 300) {
                localStorage.removeItem("token");
                localStorage.removeItem("activeTab");
                showToast.success("Logged out successfully!");
                router.push("/");
            } else {
                showToast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            showToast.error("Network error. Please try again.");
            console.error("Logout error:", error);
        }
    };
    
    



    const tabs = [
        {
            name: "Dashboard",
            icon: <RiDashboard2Fill size={22} />,
            link: "/dashboard",
        },
        {
            name: "Tickets",
            icon: <FaWpforms size={22} />,
            link: "/dashboard/tickets",
        },
    ];

    return (
        <div className="flex min-h-screen mx-1">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div className="p-6 space-y-4 mt-5">
                    <ul className="space-y-2">
                        {tabs.map((tab) => (
                            <li key={tab.name}>
                                <button
                                    onClick={() => {
                                        handleTabChange(tab.name);
                                        router.push(tab.link);
                                    }}
                                    className={`flex items-center w-full p-3 rounded-lg text-sm transition-all font-medium ${
                                        activeTab === tab.name
                                            ? "bg-gradient-to-r from-blue-500 to-blue-700"
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    <span className="mr-3">{tab.icon}</span>
                                    <span>{tab.name}</span>
                                </button>
                            </li>
                        ))}

                        {/* Dropdown Menu for Events */}
                        <li>
                            <button
                                onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
                                className="flex items-center w-full p-3 rounded-lg text-sm transition-all bg-gray-800 hover:bg-blue-600"
                            >
                                <FaRegCalendarCheck size={22} className="mr-3" />
                                <span>Events</span>
                                <span className="ml-auto">
                                    {eventsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </button>

                            {eventsDropdownOpen && (
                                <ul className="ml-6 mt-2 bg-gray-800 rounded-lg p-2 shadow-md animate-fadeIn">
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/events")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            📅 View Events
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/events/create")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            ➕ Create Event
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Dropdown Menu for Events */}
                        <li>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center w-full p-3 rounded-lg text-sm transition-all bg-gray-800 hover:bg-blue-600"
                            >
                                <FaUsers size={22} className="mr-3" />
                                <span>Users</span>
                                <span className="ml-auto">
                                    {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <ul className="ml-6 mt-2 bg-gray-800 rounded-lg p-2 shadow-md animate-fadeIn">
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/users")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            👥 View Users
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/users/create")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            ➕ Create User
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Roles */}
                        <li>
                            <button
                                onClick={() => setPermissionsDropdownOpen(!permissionsDropdownOpen)}
                                className="flex items-center w-full p-3 rounded-lg text-sm transition-all bg-gray-800 hover:bg-blue-600"
                            >
                                <FaUsers size={22} className="mr-3" />
                                <span>Roles/Permissions</span>
                                <span className="ml-auto">
                                    {permissionsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </button>

                            {permissionsDropdownOpen && (
                                <ul className="ml-6 mt-2 bg-gray-800 rounded-lg p-2 shadow-md animate-fadeIn">
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/roles")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            👥 View Roles
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => router.push("/dashboard/roles/create")}
                                            className="block w-full p-3 hover:bg-gray-700 rounded-md transition duration-200"
                                        >
                                            ➕ Create Role
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>


                        {/* Profile Section */}
                        <li>
                            <button
                                onClick={() => router.push("/dashboard/user-profile")}
                                className="flex items-center w-full p-3 rounded-lg text-sm bg-gray-800 hover:bg-blue-600 transition duration-300"
                            >
                                <PiUserCircleGearDuotone size={22} className="mr-3" />
                                <span>My Profile</span>
                            </button>
                        </li>

                        {/* Logout Button */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full p-3 rounded-lg text-sm bg-red-600 hover:bg-red-700 transition duration-300"
                            >
                                <FaPowerOff size={22} className="mr-3" />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 mt-5 mx-auto ${sidebarOpen ? "ml-0" : "ml-0 md:ml-60"
                    }`}
            >
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed top-2 left-2 z-50 md:hidden bg-gray-800 text-white p-2 rounded-full shadow-md"
                >
                    <Menu size={24} />
                </button>

                {/* Content Area */}
                <main className="w-full px-0 mx-auto">
                    {children}
                </main>

                <ToastContainer />
            </div>

            {/* Keyframe animation for dropdown */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default DashboardLayout;
