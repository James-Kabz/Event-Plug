"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../lib/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form';
import { showToast } from '@/components/ToastMessage';
import Loading from "@/app/loading";

interface TicketTypeFormData {
          id?: number;
          name: string;
          price: number;
          complimentary: boolean;
          active: boolean;
}

const EditTicketTypes = () => {
          const router = useRouter();
          const { eventId } = useParams();
          const { ticketTypeId } = useParams();
          const [ticketTypes, setTicketTypes] = useState<TicketTypeFormData[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [error, setError] = useState<string | null>(null);
          const [formLoading, setFormLoading] = useState<boolean>(false);

          useEffect(() => {
                    if (eventId) {
                              const fetchTicketTypes = async () => {
                                        try {
                                                  const response = await api.get(`/events/${eventId}/ticket-types`);
                                                  setTicketTypes(response.data.ticketTypes);

                                                  console.log(response);
                                        } catch (err) {
                                                  console.log(err);
                                                  setError('Failed to fetch ticket types');
                                        } finally {
                                                  setLoading(false);
                                        }
                              };

                              fetchTicketTypes();
                    }
          }, [eventId, ticketTypeId]);

          const handleTicketTypeSubmit = async (data: TicketTypeFormData) => {
                    setFormLoading(true);
                    try {

                        const formattedData = {
                            ...data,
                        }
                              await api.put(`/ticketTypes/${ticketTypeId}`, formattedData);
                              showToast.success('Ticket type updated successfully!');
                              setTimeout(() => {
                                        router.push(`/dashboard/events/${eventId}`);
                              }, 2000);
                    } catch (err) {
                              console.log(err);
                              showToast.error('Failed to update ticket type');
                    } finally {
                              setFormLoading(false);
                    }
          };

          if (loading) return <Loading />;
          if (error) return <div className="text-red-500">{error}</div>;

          return (
                    <div className="p-6">
                              <ToastContainer />
                              <h3 className="text-2xl font-bold mb-4">Edit Ticket Types</h3>
                              {ticketTypes.map((ticket) => (
                                        <Form<TicketTypeFormData>
                                                  key={ticket.id}
                                                  Input={[
                                                            { label: "Name", type: "text", value: ticket.name },
                                                            { label: "Price", type: "number", value: ticket.price },
                                                            { label: "Complimentary", type: "checkbox", checked: ticket.complimentary },
                                                            { label: "Active", type: "checkbox", checked: ticket.active },
                                                  ]}
                                                  onSubmit={handleTicketTypeSubmit}
                                                  loading={formLoading}
                                        />
                              ))}
                              <button
                                        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => router.push(`/dashboard/events/${eventId}`)}
                              >
                                        Back to Event
                              </button>
                    </div>
          );
};

export default EditTicketTypes;