// components/Card.tsx
import Image from 'next/image';
import { Event } from '@/types'; // Adjust the path to your Event type definition
import { FaCalendar, FaCheckCircle, FaClock, FaLocationArrow, FaTimesCircle, FaTicketAlt } from 'react-icons/fa';

interface CardProps {
          event: Event & {
                    eventStatus: string; // Add eventStatus to the event object
                    statusColor: string; // Add statusColor to the event object
          };
          onView: (event: Event) => void;
          onEdit: (event: Event) => void;
          onDelete: (eventId: number) => void;
          onEditTicketTypes?: (eventId: number) => void; // Add this prop
}

const Card: React.FC<CardProps> = ({ event, onView, onEdit, onDelete, onEditTicketTypes }) => {
          return (
                    <div className="bg-white text-black rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full">
                              {/* Event Image */}
                              <div className="relative h-56 w-full">
                                        <Image
                                                  src={event.image}
                                                  alt={event.name}
                                                  layout="fill"
                                                  objectFit="cover"
                                                  className="rounded-t-lg"
                                        />
                              </div>

                              {/* Card Content */}
                              <div className="p-3">
                                        {/* Event Name */}
                                        <h2 className="sm:text-md lg:text-xl font-extrabold text-gray-800 truncate">{event.name}</h2>

                                        {/* Event Metadata */}
                                        <div className="text-gray-600 text-sm mt-2 space-y-4">
                                                  {/* Event Time */}
                                                  <p className="flex items-center gap-1">
                                                            <FaCalendar className="text-indigo-500 text-2xl" />
                                                            {new Date(event.start_time).toLocaleDateString()}
                                                  </p>

                                                  {/* Event Location */}
                                                  <p className="flex items-center gap-1">
                                                            <FaLocationArrow className="text-red-500 text-2xl" />
                                                            {event.location}
                                                  </p>
                                        </div>

                                        {/* Event Status */}
                                        <div className="mt-2 flex items-center">
                                                  <span
                                                            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md transition-all duration-300 
              ${event.statusColor === "green" ? "bg-green-500 animate-pulse shadow-green-400/50" : ""}
              ${event.statusColor === "red" ? "bg-red-500 shadow-red-400/50" : ""}
              ${event.statusColor === "yellow" ? "bg-yellow-500 shadow-yellow-400/50" : ""}
              ${event.statusColor === "blue" ? "bg-blue-500 shadow-blue-400/50" : ""}`}
                                                  >
                                                            {event.eventStatus === "Active" && <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>}
                                                            {event.eventStatus === "Upcoming" && <FaClock className="text-white text-sm" />}
                                                            {event.eventStatus === "Cancelled" && <FaTimesCircle className="text-white text-sm" />}
                                                            {event.eventStatus === "Completed" && <FaCheckCircle className="text-white text-sm" />}
                                                            <span>{event.eventStatus}</span>
                                                  </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between gap-1 mt-3">
                                                  <button
                                                            onClick={() => onView(event)}
                                                            className="flex-1 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition"
                                                  >
                                                            View
                                                  </button>
                                                  <button
                                                            onClick={() => onEdit(event)}
                                                            className="flex-1 px-2 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600 transition"
                                                  >
                                                            Edit
                                                  </button>
                                                  <button
                                                            onClick={() => onDelete(event.id)}
                                                            className="flex-1 px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
                                                  >
                                                            Delete
                                                  </button>
                                                  {/* {onEditTicketTypes && (
                                                            <button
                                                                      onClick={() => onEditTicketTypes(event.id)}
                                                                      className="flex-1 px-2 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition flex items-center justify-center gap-1"
                                                            >
                                                                      <FaTicketAlt className="text-sm" />
                                                                      Tickets
                                                            </button>
                                                  )} */}
                                        </div>
                              </div>
                    </div>
          );
};

export default Card;