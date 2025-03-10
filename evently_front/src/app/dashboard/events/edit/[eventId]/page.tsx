"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../lib/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form';
import { User } from '@/db/models/User';
import { Event } from '@/types';
import { showToast } from '@/components/ToastMessage';
import Loading from "@/app/loading";

interface FormData {
          name: string;
          description: string;
          start_time: string;
          end_time: string;
          image: string;
          location: string;
          user_id: string;
}

const EditEvent = () => {
          const router = useRouter();
          const { eventId } = useParams();
          const [, setEvent] = useState<Event | null>(null);
          const [users, setUsers] = useState<User[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [end_time, setEventEndTime] = useState<Date | null>(null);
          const [start_time, setEventStartTime] = useState<Date | null>(null);
          const [formData, setFormData] = useState<FormData>({
                    name: '',
                    description: '',
                    start_time: '',
                    end_time: '',
                    image: '',
                    location: '',
                    user_id: ''
          });
          const [error, setError] = useState<string | null>(null);
          const [formLoading, setFormLoading] = useState<boolean>(false);

          useEffect(() => {
                    if (eventId) {
                              const fetchEvent = async () => {
                                        try {
                                                  const response = await api.get(`/events/${eventId}`);
                                                  const event = response.data.event;
                                                  setEvent(event);
                                                  setEventStartTime(new Date(event.start_time));
                                                  setEventEndTime(new Date(event.end_time));
                                                  // Update formData with event data
                                                  setFormData({
                                                            name: event.name || '',
                                                            description: event.description || '',
                                                            start_time: event.start_time ? new Date(event.start_time).toISOString().slice(0, 16) : '',
                                                            end_time: event.end_time ? new Date(event.end_time).toISOString().slice(0, 16) : '',
                                                            image: event.image || '',
                                                            location: event.location || '',
                                                            user_id: event.user_id?.toString() || ''
                                                  });
                                        } catch (err) {
                                                  console.log(err);
                                                  setError('Failed to fetch event');
                                        } finally {
                                                  setLoading(false);
                                        }
                              };

                              const fetchUsers = async () => {
                                        try {
                                                  const response = await api.get(`/users`);
                                                  setUsers(response.data.users);
                                        } catch (err) {
                                                  console.log(err);
                                                  setError('Failed to fetch users');
                                        }
                              };

                              fetchEvent();
                              fetchUsers();
                    }
          }, [eventId]);

          const handleSubmit = async (data: FormData) => {
                    setFormLoading(true);
                    try {
                              const formattedData = {
                                        ...data,
                                        start_time: new Date(data.start_time).toISOString(),
                                        end_time: new Date(data.end_time).toISOString(),
                              };
                              await api.put(`/events/${eventId}`, formattedData);
                              showToast.success('Event updated successfully!');
                              setTimeout(() => {
                                        router.push('/dashboard/events');
                              }, 2000);
                    } catch (err) {
                              console.log(err);
                              showToast.error('Failed to update event');
                    } finally {
                              setFormLoading(false);
                    }
          };

          if (loading) return <Loading />;
          if (error) return <div className="text-red-500">{error}</div>;

          const inputs = [
                    {
                              label: "name",
                              type: "text",
                              value: formData.name,
                    },
                    {
                              label: "description",
                              type: "text",
                              value: formData.description,
                    },
                    {
                              label: "start_time",
                              type: "datetime-local",
                              valueDate: start_time, 
                    },
                    {
                              label: "end_time",
                              type: "datetime-local",
                              valueDate: end_time, // Format the date
                    },
                    {
                              label: "image",
                              type: "text",
                              value: formData.image,
                    },
                    {
                              label: "location",
                              type: "text",
                              value: formData.location,
                    },
                    {
                              label: "user",
                              type: "select",
                              value: formData.user_id,
                              options: users.map((user) => ({
                                        label: user.name,
                                        value: user.id.toString(),
                              })),
                    },
          ];

          const extraButtons = [
                    {
                              label: 'Back',
                              type: 'button',
                              onClick: () => router.push('/dashboard/events'),
                    },
          ];

          return (
                    <div className="p-6">
                              <ToastContainer />
                              <h3 className="text-2xl font-bold mb-4">Edit Event</h3>
                              <Form<FormData>
                                        Input={inputs}
                                        onSubmit={handleSubmit}
                                        loading={formLoading}
                                        addButton={extraButtons}
                              />
                    </div>
          );
};

export default EditEvent;