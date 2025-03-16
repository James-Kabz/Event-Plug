"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '@/components/ToastMessage'; // Adjust the path as needed
import Loading from '../../loading'; // Import the Loading component
import Card from '@/components/Card'; // Import the Card component
import { Event } from '@/types'; // Adjust the path to your Event type definition
import api from '../../../../lib/axios';
import Footer from '@/components/Footer';

export default function EventsPage() {
          const [events, setEvents] = useState<Event[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [error, setError] = useState<string | null>(null);
          const router = useRouter();


          // Fetch events from your API
          useEffect(() => {
                    const fetchEvents = async () => {
                              try {
                                        const response = await api.get(`events`);

                                        const formattedEvents = response.data.events.map((event: Event) => {
                                                  const now = new Date(); // Current time
                                                  const startTime = new Date(event.start_time); // Parse start_time as Date
                                                  const endTime = new Date(event.end_time); // Parse end_time as Date

                                                  let eventStatus;
                                                  let statusColor;
                                                  if (now < startTime) {
                                                            // Event is upcoming
                                                            statusColor = "yellow";
                                                            eventStatus = `Upcoming - Starts on ${startTime.toLocaleString("en-KE", {
                                                                      weekday: "long",
                                                                      year: "numeric",
                                                                      month: "long",
                                                                      day: "2-digit",
                                                                      hour: "2-digit",
                                                                      minute: "2-digit",
                                                                      hour12: true,
                                                                      timeZoneName: "short",
                                                            })}`;
                                                  } else if (now >= startTime && now <= endTime) {
                                                            // Event is active
                                                            eventStatus = "Active";
                                                            statusColor = "green";
                                                  } else {
                                                            // Event has passed
                                                            eventStatus = "Expired";
                                                            statusColor = "red";
                                                  }

                                                  return {
                                                            ...event,
                                                            start_time: event.start_time, // Pass the original ISO date string
                                                            end_time: event.end_time, // Pass the original ISO date string
                                                            eventStatus,
                                                            statusColor,
                                                  };
                                        });
                                        setEvents(formattedEvents);
                              } catch (err) {
                                        setError(err instanceof Error ? err.message : 'An error occurred');
                                        showToast.error('Failed to fetch events');
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchEvents();
          }, []);

          // Handle event deletion
          const handleDelete = async (eventId: number) => {
                    try {
                              await api(`deleteEvent/${eventId}`, {
                                        method: 'DELETE',
                              });
                              setEvents(events.filter((event) => event.id !== eventId));
                              showToast.success('Event deleted successfully');
                    } catch (err) {
                              console.error('Failed to delete event:', err);
                              showToast.error('Failed to delete event');
                    }
          };

          // Handle event editing
          const handleEdit = (event: Event) => {
                    showToast.info('Redirecting to edit event...');
                    router.push(`/dashboard/events/edit/${event.id}`);
          };

          // Handle event viewing
          const handleView = (event: Event) => {
                    showToast.info('Redirecting to view event...');
                    router.push(`/dashboard/events/${event.id}`);
          };

          // Handle ticket types editing
          const handleEditTicketTypes = (eventId: number) => {
                    showToast.info('Redirecting to edit ticket types...');
                    router.push(`/dashboard/events/${eventId}/ticket-types`);
          };

          if (loading) return <Loading />;

          if (error) {
                    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
          }

          return (
                    <div className="min-h-screen  bg-gray-100 text-black py-6 sm:py-10">
                              <ToastContainer /> {/* Include ToastContainer for rendering toasts */}
                              <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
                                        {/* Heading */}
                                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                                                  Upcoming Events
                                        </h1>

                                        {/* Event Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                                                  {events.map((event) => (
                                                            <Card
                                                                      key={event.id}
                                                                      event={{
                                                                                ...event,
                                                                                eventStatus: event.eventStatus, // Pass event status
                                                                                statusColor: event.statusColor, // Pass status color
                                                                      }}
                                                                      onView={handleView}
                                                                      onEdit={handleEdit}
                                                                      onDelete={handleDelete}
                                                                      onEditTicketTypes={handleEditTicketTypes} 
                                                            />
                                                  ))}
                                        </div>
                              </div>
                              <Footer />
                    </div>
          );
}