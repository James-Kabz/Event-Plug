"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/components/ToastMessage"; // Adjust path if needed

import Card from "@/components/Card"; // Import Card component
import { Event } from "@/types"; // Adjust path to your Event type definition
import api from "../../../lib/axios";
import Loading from "../loading";


export default function EventsSlot({ events }: { events: Event[] }) {
  const [eventList, setEventList] = useState<Event[]>(events);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch events from your API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`getEvents`);
        const formattedEvents = response.data.events.map((event: Event) => {
          const now = new Date(); // Current time
          const startTime = new Date(event.start_time);
          const endTime = new Date(event.end_time);

          let eventStatus;
          let statusColor;
          if (now < startTime) {
            statusColor = "yellow";
            eventStatus = `Upcoming - Starts on ${startTime.toISOString()}`;
          } else if (now >= startTime && now <= endTime) {
            eventStatus = "Active";
            statusColor = "green";
          } else {
            eventStatus = "Expired";
            statusColor = "red";
          }

          return {
            ...event,
            eventStatus,
            statusColor,
          };
        });
        setEventList(formattedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        showToast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventList]);

  const handleDelete = async (eventId: number) => {
    try {
      await api.delete(`deleteEvent/${eventId}`);
      setEventList(events.filter((event) => event.id !== eventId));
      showToast.success("Event deleted successfully");
    } catch (err) {
      console.error("Failed to delete event:", err);
      showToast.error("Failed to delete event");
    }
  };

  const handleEdit = (event: Event) => {
    showToast.info("Redirecting to edit event...");
    router.push(`/dashboard/events/edit/${event.id}`);
  };

  const handleView = (event: Event) => {
    showToast.info("Redirecting to view event...");
    router.push(`/dashboard/events/${event.id}`);
  };

  const handleEditTicketTypes = (eventId: number) => {
    showToast.info("Redirecting to edit ticket types...");
    router.push(`/dashboard/events/${eventId}/ticket-types`);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black py-6 sm:py-10">
      <ToastContainer />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              event={event}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onEditTicketTypes={handleEditTicketTypes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
