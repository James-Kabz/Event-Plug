export interface User {
  id: number;
  name:string;
  email: string;
  role: string;
  password: string;
  access_token: string;
}

export interface Role{
  id: number;
  name: string;
}

export interface Permission{
  id: number;
  name: string;
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


