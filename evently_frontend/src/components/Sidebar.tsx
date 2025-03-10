"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
          FaUsers,
          FaGraduationCap,
          FaWpforms,
          FaPowerOff,
          FaChevronDown,
          FaChevronUp,
} from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { PiUserCircleGearDuotone } from "react-icons/pi";

type SidebarProps = {
          sidebarOpen: boolean;
          setSidebarOpen: (open: boolean) => void;
          activeTab: string;
          handleTabChange: (tabName: string, view: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
          sidebarOpen,
          setSidebarOpen,
          activeTab,
          handleTabChange,
}) => {
          const router = useRouter();
          const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

          const tabs = [
                    { name: "Dashboard", icon: <RiDashboard2Fill size={20} />, link: "/dashboard" },
                    { name: "Ticket Types", icon: <FaGraduationCap size={20} />, link: "/dashboard/ticket-types" },
                    { name: "Tickets", icon: <FaWpforms size={20} />, link: "/dashboard/tickets" },
          ];

          return (
                    <>
                              {/* Sidebar Overlay for Mobile */}
                              {sidebarOpen && (
                                        <div
                                                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                                  onClick={() => setSidebarOpen(false)}
                                        ></div>
                              )}

                              {/* Sidebar */}
                              <aside
                                        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                                                  } lg:translate-x-0`}
                              >
                                        {/* Navigation Links */}
                                        <nav className="p-6 space-y-4">
                                                  <ul>
                                                            {tabs.map((tab) => (
                                                                      <li key={tab.name}>
                                                                                <button
                                                                                          onClick={() => handleTabChange(tab.name, "view")}
                                                                                          className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ease-in-out ${activeTab === tab.name ? "bg-blue-500" : "hover:bg-blue-600"
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
                                                                                className="flex items-center w-full p-3 rounded-lg transition-all duration-300 bg-gray-700 hover:bg-blue-600"
                                                                      >
                                                                                <FaUsers size={20} className="mr-3" />
                                                                                <span>Events</span>
                                                                                <span className="ml-auto">
                                                                                          {eventsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                                                                                </span>
                                                                      </button>
                                                                      {eventsDropdownOpen && (
                                                                                <ul className="ml-6 mt-2 bg-gray-800 rounded-lg p-2">
                                                                                          <li>
                                                                                                    <button
                                                                                                              onClick={() => router.push("/dashboard/events")}
                                                                                                              className="block w-full p-2 hover:bg-gray-700 rounded-md"
                                                                                                    >
                                                                                                              View Events
                                                                                                    </button>
                                                                                          </li>
                                                                                          <li>
                                                                                                    <button
                                                                                                              onClick={() => router.push("/dashboard/events/create")}
                                                                                                              className="block w-full p-2 hover:bg-gray-700 rounded-md"
                                                                                                    >
                                                                                                              Create Event
                                                                                                    </button>
                                                                                          </li>
                                                                                </ul>
                                                                      )}
                                                            </li>

                                                            {/* Profile Section */}
                                                            <li>
                                                                      <button
                                                                                onClick={() => router.push("/dashboard/user-profile")}
                                                                                className="flex items-center w-full p-3 rounded-lg bg-gray-700 hover:bg-blue-600"
                                                                      >
                                                                                <PiUserCircleGearDuotone size={20} className="mr-3" />
                                                                                <span>My Profile</span>
                                                                      </button>
                                                            </li>

                                                            {/* Logout Button */}
                                                            <li>
                                                                      <button
                                                                                onClick={() => console.log("Logging out...")}
                                                                                className="flex items-center w-full p-3 rounded-lg bg-red-600 hover:bg-red-700"
                                                                      >
                                                                                <FaPowerOff size={20} className="mr-3" />
                                                                                <span>Logout</span>
                                                                      </button>
                                                            </li>
                                                  </ul>
                                        </nav>
                              </aside>
                    </>
          );
};

export default Sidebar;
