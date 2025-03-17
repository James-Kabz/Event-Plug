This project uses laravel for back-end and next js for front-end
# 🎟️ Event Management System

## 📌 Overview
This is a **full-stack event management system** built with **Laravel 12** (backend) and **Next.js (TypeScript, Tailwind CSS)** (frontend). It allows users to create, manage, and book tickets for events. The system supports **user authentication**, **role-based access control (RBAC)**, and **ticket management**.

## 🚀 Features
- **User Authentication** (Laravel Sanctum + Next.js)
- **Role-Based Access Control (RBAC)** (Admins, Event Organizers, Attendees)
- **Event Creation & Management** (CRUD operations for events)
- **Ticket Types for Events** (Different ticket categories)
- **User Permissions & Roles** (Using Laravel Spatie)
- **Next.js Frontend with Tailwind CSS**
- **API-based Communication** (Laravel as the backend, Next.js consuming APIs)

---

## 🛠️ Installation
### **Backend (Laravel 12)**
1. Clone the project:
   ```sh
   git clone https://github.com/James-Kabz/Event-Plud.git
   cd Event-Plug/backend
   ```
2. Install dependencies:
   ```sh
   composer install
   ```
3. Copy and configure the environment file:
   ```sh
   cp .env.example .env
   ```
4. Generate the application key:
   ```sh
   php artisan key:generate
   ```
5. Run migrations and seed data:
   ```sh
   php artisan migrate --seed
   ```
6. Start the Laravel development server:
   ```sh
   php artisan serve
   ```

### **Frontend (Next.js with TypeScript & Tailwind CSS)**
1. Navigate to the frontend directory:
   ```sh
   cd evently_frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the Next.js development server:
   ```sh
   npm run dev
   ```

---

## 🔗 API Endpoints
### **Authentication**
- `POST /login` – User login
- `POST /register` – User registration
- `POST /logout` – Logout (Requires authentication)

### **Events**
- `POST /createEvent` – Create a new event
- `GET /getEvent/{id}` – Retrieve event details
- `PUT /editEvent/{id}` – Update event details
- `DELETE /deleteEvent/{id}` – Delete an event
- `GET /getEvents` – Fetch all events (Requires authentication)

### **Tickets**
- `POST /createTicketType` – Create a ticket type
- `GET /getTicketTypes` – Fetch all ticket types
- `GET /events/{event_id}/ticket-types` – Get ticket types for a specific event
- `PUT /editTicketType/{id}` – Update ticket type
- `DELETE /deleteTicketType/{id}` – Delete ticket type

---

## 📌 Role-Based Access Control (RBAC)
Using **Spatie Laravel Permission**, the system supports:
- **Admin:** Manage all users, events, and ticket types
- **Event Organizer:** Create and manage their own events
- **User:** View and book tickets for events

---

## 🔥 Technologies Used
- **Backend:** Laravel 12, Sanctum, Spatie Permissions
- **Frontend:** Next.js (TypeScript), Tailwind CSS
- **Database:** MySQL
- **Authentication:** Laravel Sanctum
- **API Communication:** Axios

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact
For questions or issues, feel free to open an issue or contact me at [kabogp@gmail.com](mailto:kabogp.email@gmail.com).

---

### 🚀 Happy Coding! 🎉

