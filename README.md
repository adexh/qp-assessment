# Grocery Booking API
This repository contains a Grocery Booking API designed to manage grocery items and facilitate user bookings. The project is built using Express.js, Prisma ORM, and PostgreSQL, with API documentation provided via Swagger.

---

## Problem Statement
### Roles:
1. Admin:
	- Add new grocery items to the system.
	- View existing grocery items.
	- Remove grocery items from the system.
	- Update details (e.g., name, price) of existing grocery items.
  - Manage inventory levels of grocery items.

2. User:
	- View the list of available grocery items.
	- Book multiple grocery items in a single order.

3. Advanced Challenge
	- Containerize the application using Docker for ease of deployment and scaling.

---

## Tech Stack
- Backend Framework: Express.js
- Database: PostgreSQL
- ORM: Prisma
- API Documentation: Swagger UI

---

## Prerequisites
1. **Environment Setup:** Ensure the .env file is properly configured with your database connection details.
2. **Database:** PostgreSQL must be installed and running.
3. **Tools:** Node.js and npm must be installed.

---

## Installation and Setup

### Development Mode:
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>/server
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations and seed the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

4. Start the application:
```bash
Copy code
npm run dev
```

### Access API documentation (development mode only):
Open your browser and navigate to: `http://localhost:3000/api-docs`

---

## Production Mode (Using Docker):
1. Build and start the application with Docker Compose:

```bash
docker-compose up
```

2. This will
  - Build the Docker image of the app.
  - Start the PostgreSQL database service.
  - Run the application.

---

## API Documentation
The API is documented using Swagger and is accessible at:
Development Mode: http://localhost:3000/api-docs

---

## Additional Notes
1. Ensure your .env file is correctly configured before running the application.
2. The application is containerized for ease of deployment and scaling using Docker.

Feel free to contribute to the project or raise issues for any improvements.