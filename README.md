
---
<div>
<img src="./project-docs/solid-stack-logo.svg" alt="app logo">
</div>

# ReviewShelf

> **A Modular Books & Reviews Platform Built for Scalability and Performance**  
> **By Jordach Makaya** <br> 

<div> 

[![wakatime](https://wakatime.com/badge/user/018ebde5-003c-47c2-8ab0-3530226c609b/project/06af8958-660b-4fb5-8301-2e882e722777.svg)](https://wakatime.com/badge/user/018ebde5-003c-47c2-8ab0-3530226c609b/project/06af8958-660b-4fb5-8301-2e882e722777)

</div>

---

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=bugs)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=coverage)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_ReviewShelf&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_ReviewShelf)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Logging and Error Handling](#logging-and-error-handling)
- [Setup and Installation](#setup-and-installation)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

---

## Project Overview

**ReviewShelf** is a modular platform for users to explore books, write reviews, and manage personal bookshelves. The project employs **NestJS** for a scalable backend and **Angular** for a dynamic frontend, all within an **Nx monorepo**. With structured JSON error handling and logging via `NestJS-Pino` and `nestjs-flub`, this application is designed for clear, informative logs to aid troubleshooting and improve maintainability.

---

## Features

- **User Authentication** (IAM): JWT-based secure registration, login, and logout.
- **Book Catalog**: Browse, add, update, or delete books (admin).
- **Reviews**: Add, edit, and upvote reviews for books.
- **Personal Bookshelf**: Track favorite books.
- **Notifications**: Alerts for new reviews and bookshelf updates.
- **Error Logging**: Comprehensive, structured JSON error logging for effective troubleshooting.

---

## Tech Stack

### Backend
- **NestJS**: Modular, scalable server-side application framework.
- **TypeScript**: Strictly typed, modern JavaScript.
- **Nx Monorepo**: Manages libraries and apps in an organized, modular manner.
- **NestJS-Pino**: High-performance JSON-based logging.
- **nestjs-flub**: Error handling with structured JSON responses.

### Frontend
- **Angular**: Framework for building dynamic and engaging UI.
- **Tailwind CSS**: Utility-first CSS for rapid styling.

---

## Project Structure

```
review-shelf/
├── apps/
│   ├── frontend/          # Angular application (user interface)
│   └── api/               # NestJS application (backend)
│
├── libs/
│   ├── auth/              # Authentication module (IAM)
│   ├── books/             # Book module (book entity, controllers, services)
│   ├── reviews/           # Review module (review entity, controllers, services)
│   ├── users/             # User module (user entity, controllers, services)
│   ├── bookshelf/         # Bookshelf module (user book management)
│   ├── notifications/     # Notifications module
│   ├── logging/           # Custom logging with NestJS-Pino and nestjs-flub
│   └── common/            # Common utilities, DTOs, interfaces
│
├── tools/                 # Nx workspace utilities
├── nx.json
├── angular.json
└── package.json
```

---

## Routes

### **Backend API Routes**

#### **IAM Module (Authentication)**

- `POST /api/iam/register` - Register a new user
- `POST /api/iam/login` - Log in to receive a JWT token
- `POST /api/iam/logout` - Log out (invalidate JWT token)
- `POST /api/iam/reset-password` - Reset user password

#### **User Module**

- `GET /api/users/:id` - Retrieve user profile information
- `PATCH /api/users/:id` - Update user profile information
- `DELETE /api/users/:id` - Delete user account

#### **Books Module**

- `GET /api/books` - Get a list of books, with optional filters
- `GET /api/books/:id` - Retrieve details of a specific book
- `POST /api/books` - Add a new book (admin only)
- `PUT /api/books/:id` - Update book information (admin only)
- `DELETE /api/books/:id` - Delete a book (admin only)

#### **Reviews Module**

- `GET /api/reviews/book/:bookId` - Get all reviews for a specific book
- `POST /api/reviews/book/:bookId` - Add a review to a book
- `PUT /api/reviews/:reviewId` - Edit an existing review
- `DELETE /api/reviews/:reviewId` - Delete a review
- `POST /api/reviews/:reviewId/upvote` - Upvote a review

#### **Bookshelf Module**

- `GET /api/bookshelf` - Retrieve the user’s bookshelf
- `POST /api/bookshelf` - Add a book to the user’s bookshelf
- `DELETE /api/bookshelf/:bookId` - Remove a book from the bookshelf

#### **Notifications Module**

- `GET /api/notifications` - Retrieve user notifications
- `POST /api/notifications/mark-read/:id` - Mark a notification as read

---

## Logging and Error Handling

**ReviewShelf** employs a robust logging and error-handling system using `NestJS-Pino` for structured JSON logging and `nestjs-flub` for consistent, structured error responses across all modules.

### Structured JSON Error Format

All error responses follow a JSON structure for consistency and readability, helping with rapid debugging and log analysis. Below is the structure of each error response:

```json
{
  "status": "error",
  "message": "Detailed error message",
  "errorType": "typeOfError",
  "where": "AuthService",
  "success": false,
  "date": "2024-11-10T12:34:56.789Z",
  "statusCode": 400
}
```

- **status**: Describes the overall status of the response (`error` or `success`).
- **message**: Detailed description of the error.
- **errorType**: Specific type or category of the error.
- **where**: Location or module where the error originated.
- **success**: Boolean indicating if the operation was successful (`false` in case of errors).
- **date**: Timestamp for when the error occurred, aiding in log analysis.
- **statusCode**: HTTP status code of the error (e.g., 400, 404, 500).

### Configuring `NestJS-Pino` and `nestjs-flub`

To enable logging and error handling, **ReviewShelf** includes a dedicated `logging` library within the Nx monorepo. This library configures `NestJS-Pino` and `nestjs-flub` for centralized logging and error handling across all modules.

- **NestJS-Pino** is set to output JSON logs with minimal formatting, making it ideal for logging in production environments.
- **nestjs-flub** provides middleware for generating structured error responses that follow the JSON format above, making error data easily accessible and consistent across services.

### Examples

#### Info Log Example

```json
{
  "level": "info",
  "message": "User registered successfully",
  "context": "AuthService",
  "date": "2024-11-10T12:34:56.789Z"
}
```

#### Error Log Example

```json
{
  "status": "error",
  "message": "Invalid credentials provided",
  "errorType": "UnauthorizedError",
  "where": "AuthService",
  "success": false,
  "date": "2024-11-10T12:34:56.789Z",
  "statusCode": 401
}
```

These structured logs allow easy log aggregation, monitoring, and querying, making it simple to filter and analyze errors and events across the system.

---

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or above)
- **Nx CLI**: Install globally with `npm install -g nx`
- **PostgreSQL**: Set up a PostgreSQL instance for database support

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/review-shelf.git
   cd review-shelf
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in `apps/api` with database, JWT, and logging settings.
   - Example:
     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/review_shelf
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the Backend (NestJS)**:
   ```bash
   nx serve api
   ```

5. **Start the Frontend (Angular)**:
   ```bash
   nx serve frontend
   ```

6. **Access the Application**:
   - Frontend: [http://localhost:4200](http://localhost:4200)
   - Backend API: [http://localhost:3333](http://localhost:3333)

---

## Future Improvements

- **Search & Recommendation System**: Integrate Elasticsearch for full-text search and recommendations.
- **Role-Based Access Control (RBAC)**: Add role-based access for enhanced security and flexibility.
- **Real-Time Notifications**: WebSocket integration for real-time updates on activities.
- **Enhanced Error Tracking**: Integrate with external monitoring services (e.g
