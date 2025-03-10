"use client";
import { Event, TicketType } from "@/types";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt, FaShareAlt, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface EventDetailsProps {
          event: Event;
          ticketTypes: TicketType[];
          onBack: () => void;
}

export default function EventDetails({ event, ticketTypes, onBack }: EventDetailsProps) {
          return (
                    <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                              {/* Event Banner */}
                              {event.image && (
                                        <Image src={event.image} alt={event.name} width={1920} height={960} className="w-full h-96 object-cover rounded-lg" />
                              )}

                              <div className="p-6">
                                        {/* Event Title & Location */}
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.name}</h1>
                                        <p className="flex items-center text-gray-600 text-lg">
                                                  <FaMapMarkerAlt className="text-red-500 mr-2" /> {event.location}
                                        </p>
                                        <p className="flex items-center text-gray-600 text-lg">
                                                  <FaCalendarAlt className="text-indigo-500 mr-2" /> {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
                                        </p>

                                        {/* Share Section */}
                                        <div className="flex items-center space-x-4 mt-4">
                                                  <FaShareAlt className="text-gray-500" />
                                                  <a href="#" className="text-blue-600"><FaFacebook size={20} /></a>
                                                  <a href="#" className="text-pink-500"><FaInstagram size={20} /></a>
                                                  <a href="#" className="text-blue-500"><FaLinkedin size={20} /></a>
                                                  <a href="#" className="text-green-500"><FaWhatsapp size={20} /></a>
                                        </div>

                                        {/* Host Section */}
                                        <div className="mt-6">
                                                  <h2 className="text-2xl font-semibold text-gray-900">Host</h2>
                                                  {/* <p className="text-lg text-gray-600">{event.host || "Unknown Host"}</p> */}
                                        </div>

                                        {/* Description */}
                                        <div className="mt-6">
                                                  <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
                                                  <p className="text-gray-700 text-lg">{event.description}</p>
                                        </div>

                                        {/* Ticket Types Section */}
                                        <div className="mt-6">
                                                  <h2 className="text-2xl font-semibold text-gray-900">Ticket Types</h2>
                                                  {ticketTypes.length > 0 ? (
                                                            <ul className="space-y-4">
                                                                      {ticketTypes.map((ticket) => (
                                                                                <li key={ticket.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                                                                          <div>
                                                                                                    <p className="text-lg font-semibold text-gray-800">{ticket.name}</p>
                                                                                                    <p className="text-gray-600"><strong>Price:</strong> KES {ticket.price}</p>
                                                                                          </div>
                                                                                          {ticket.active ? (
                                                                                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Available</span>
                                                                                          ) : (
                                                                                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Closed</span>
                                                                                          )}
                                                                                </li>
                                                                      ))}
                                                            </ul>
                                                  ) : (
                                                            <p className="text-gray-500">No tickets available for this event.</p>
                                                  )}
                                        </div>

                                        {/* Photos Section */}
                                        <div className="mt-6">
                                                  <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>
                                                  {event.image ? (
                                                            <Image src={event.image} alt="Event Photo" width={200} height={150} className="mt-2 rounded-lg" />
                                                  ) : (
                                                            <p className="text-gray-500">No event photos available.</p>
                                                  )}
                                        </div>

                                        {/* Location Map */}
                                        {/* <div className="mt-6">
                                                  <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
                                                  <iframe
                                                            title="Google Map"
                                                            className="mt-2 rounded-lg w-full h-64"
                                                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(event.location)}`}
                                                            allowFullScreen
                                                  />
                                        </div> */}

                                        {/* Back Button */}
                                        <div className="mt-6">
                                                  <button
                                                            onClick={onBack}
                                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
                                                  >
                                                            Back to Events
                                                  </button>
                                        </div>
                              </div>
                    </div>
          );
}
