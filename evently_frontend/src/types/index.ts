export interface User {
  id: number;
  name:string;
  email: string;
  password: string;
}

export interface Event {
  statusColor: string;
  eventStatus: string;
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  image: string;
  location: string;
  user_id: number;
  user: {
    id: number;
    name:string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketType {
  id: number;
  name: string;
  price: number;
  complimentary: boolean;
  active: boolean;
  user_id: number;
  event_id: number;
}


