"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Form from "@/components/Form";
import api from "../../../../../lib/axios";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ToastMessage";
import { User } from "@/types";

interface FormData {
          name: string;
          description: string;
          start_time: string;
          end_time: string;
          image: string;
          location: string;
          user_id: number;
}

interface TicketTypeFormData {
          name: string;
          price: number;
          complimentary: boolean;
          active: boolean;
          user_id: number; // Add user_id to the ticket type interface
}

const CreateEventPage: React.FC = () => {
          const router = useRouter();
          const [formLoading, setFormLoading] = useState<boolean>(false);
          const [users, setUsers] = useState<User[]>([]);
          const [step, setStep] = useState<number>(1);
          const [eventId, setEventId] = useState<number | null>(null);
          const [userId, setUserId] = useState<number | null>(null); // Add state for user_id
          const [ticketTypes, setTicketTypes] = useState<TicketTypeFormData[]>([
                    { name: "", price: 0, complimentary: false, active: false, user_id: 0 }, // Initialize with user_id
          ]);

          useEffect(() => {
                    const fetchUsers = async () => {
                              try {
                                        const response = await api.get(`getUsers`);
                                        if (response?.data?.users) {
                                                  setUsers(response.data.users);
                                        } else {
                                                  throw new Error("Invalid response format");
                                        }
                              } catch (error) {
                                        console.error("Failed to fetch users:", error);
                                        showToast.error("Failed to fetch users");
                              }
                    };

                    fetchUsers();
          }, []);

          const onSubmitEvent = async (data: FormData) => {
            setFormLoading(true);
            try {
                const response = await api.post(`createEvent`, data);
                if (response?.data?.id) {
                    const newEventId = response.data.id;
                    const newUserId = data.user_id;
        
                    setEventId(newEventId); // Store event ID
                    setUserId(newUserId); // Store user ID
                    showToast.success("Event created successfully!");
        
                    // Move to step 2 (Create Ticket Types) immediately
                    setStep(2);
        
                    // Directly update the ticketTypes state with the correct IDs
                    setTicketTypes((prevTicketTypes) =>
                        prevTicketTypes.map((ticket) => ({
                            ...ticket,
                            event_id: newEventId, // Set event ID immediately
                            user_id: newUserId, // Set user ID immediately
                        }))
                    );
                } else {
                    throw new Error("Event ID not received from APP");
                }
            } catch (error) {
                console.error("Failed to create event", error);
                showToast.error("Failed to create event");
            } finally {
                setFormLoading(false);
            }
        };
        
        

        const onSubmitTicketTypes = async () => {
            if (!eventId) {
                showToast.error("Event ID is missing");
                return;
            }
        
            setFormLoading(true);
            try {
                await Promise.all(
                    ticketTypes.map((ticketType) =>
                        api.post(`createTicketType`, { 
                            ...ticketType, 
                            event_id: eventId, 
                            user_id: userId ?? 1 // Ensure correct user ID
                        })
                    )
                );
        
                showToast.success("All ticket types added successfully!");
                setTimeout(() => {
                    router.push("/dashboard/events");
                }, 2000);
            } catch (error) {
                console.error("Failed to create ticket types", error);
                showToast.error("Failed to create ticket types");
            } finally {
                setFormLoading(false);
            }
        };
        
        

          const addNewTicketType = () => {
                    setTicketTypes([
                              ...ticketTypes,
                              { name: "", price: 0, complimentary: false, active: false, user_id: userId || 0 }, // Include user_id when adding a new ticket type
                    ]);
          };

          const updateTicketType = (index: number, field: keyof TicketTypeFormData, value: string | number | boolean) => {
                    setTicketTypes((prevTicketTypes) => {
                              const updatedTicketTypes = [...prevTicketTypes];
                              updatedTicketTypes[index] = { ...updatedTicketTypes[index], [field]: value };
                              return updatedTicketTypes;
                    });
          };

          const removeTicketType = (index: number) => {
                    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
          };

          const eventInputs = [
                    { label: "name", type: "text", required: true },
                    { label: "description", type: "text", required: true },
                    { label: "start_time", type: "datetime-local", required: true },
                    { label: "end_time", type: "datetime-local", required: true },
                    { label: "image", type: "text", required: true },
                    { label: "location", type: "text", required: true },
                    {
                              label: "user_id",
                              type: "select",
                              options: users.map((user) => ({
                                        label: `${user.name}`,
                                        value: user.id,
                              })),
                    },
          ];

          return (
                    <div className="w-full max-w-5xl mx-auto my-auto text-black bg-white p-4 sm:p-6 rounded-lg shadow">
                              <ToastContainer position="top-right" autoClose={3000} />
                              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                                        {step === 1 ? "Create New Event" : "Add Ticket Types"}
                              </h2>

                              {step === 1 ? (
                                        <Form<FormData>
                                                  Input={eventInputs}
                                                  onSubmit={onSubmitEvent}
                                                  loading={formLoading}
                                                  addButton={[
                                                            { label: "Back", type: "button", onClick: () => router.push("/dashboard/events") },
                                                  ]}
                                        />
                              ) : (
                                        <div>
                                                  {ticketTypes.map((ticketType, index) => (
                                                            <div key={index} className="mb-4 border p-4 rounded-lg">
                                                                      <h3 className="text-lg font-semibold">Ticket Type {index + 1}</h3>

                                                                      <div className="space-y-4">
                                                                                <div>
                                                                                          <label className="block text-sm font-medium text-gray-700">Name</label>
                                                                                          <input
                                                                                                    type="text"
                                                                                                    value={ticketType.name}
                                                                                                    onChange={(e) => updateTicketType(index, "name", e.target.value)}
                                                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                                                    required
                                                                                          />
                                                                                </div>

                                                                                <div>
                                                                                          <label className="block text-sm font-medium text-gray-700">Price</label>
                                                                                          <input
                                                                                                    type="number"
                                                                                                    value={ticketType.price === 0 ? "" : ticketType.price} // Show empty if 0
                                                                                                    onChange={(e) => {
                                                                                                              const value = e.target.value === "" ? "" : Number(e.target.value);
                                                                                                              updateTicketType(index, "price", value);
                                                                                                    }}
                                                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                                                    required
                                                                                          />

                                                                                </div>

                                                                                <div>
                                                                                          <label className="block text-sm font-medium text-gray-700">Complimentary</label>
                                                                                          <input
                                                                                                    type="checkbox"
                                                                                                    checked={ticketType.complimentary}
                                                                                                    onChange={(e) => updateTicketType(index, "complimentary", e.target.checked)}
                                                                                                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                                          />
                                                                                </div>

                                                                                <div>
                                                                                          <label className="block text-sm font-medium text-gray-700">Active</label>
                                                                                          <input
                                                                                                    type="checkbox"
                                                                                                    checked={ticketType.active}
                                                                                                    onChange={(e) => updateTicketType(index, "active", e.target.checked)}
                                                                                                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      <button
                                                                                type="button"
                                                                                className="mt-2 text-red-500 hover:underline"
                                                                                onClick={() => removeTicketType(index)}
                                                                      >
                                                                                Remove
                                                                      </button>
                                                            </div>
                                                  ))}

                                                  <button
                                                            type="button"
                                                            className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4"
                                                            onClick={addNewTicketType}
                                                  >
                                                            Add Another Ticket Type
                                                  </button>

                                                  <button
                                                            type="button"
                                                            className="bg-green-500 text-white p-2 rounded-lg w-full"
                                                            onClick={onSubmitTicketTypes}
                                                  >
                                                            Submit All Ticket Types
                                                  </button>
                                        </div>
                              )}
                    </div>
          );
};

export default CreateEventPage;