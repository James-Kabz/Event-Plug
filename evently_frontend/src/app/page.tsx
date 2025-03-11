import Footer from "@/components/Footer";
// import Image from "next/image";
import Link from "next/link";
import api from "../../lib/axios";
import { Event } from "@/types";
import EventsSlot from "./@events/page";

export default async function Home() {
  let events: Event[] = [];

  try {
    const response = await api.get("/getEvents"); // Adjust the endpoint if needed
    events = response.data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-full mx-auto">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/dashboard/events"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            View Events
          </Link>
        </div>
      </main>

      <div className="col-span-full">
        <EventsSlot events={events} />
      </div>

      <Footer />
    </div>
  );
}
