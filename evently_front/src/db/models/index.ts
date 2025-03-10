// models/index.ts
import { User } from "./User";
import { Event } from "./Event";
import { TicketType } from "./Ticket_Type";
import { Ticket } from "./Ticket";

// // Event associations
// Event.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });

Event.hasMany(TicketType, {
  foreignKey: "event_id",
  as: "ticketTypes",
});

// TicketType associations
TicketType.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

TicketType.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
});

Ticket.belongsTo(TicketType, {
  foreignKey: "ticket_type_id",
  as: "ticket_type",
});

Ticket.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
});
// Export the models
export { User, Event, TicketType };
