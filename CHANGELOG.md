# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.2] - 2024-11-16

### Added
- **User Operations in Auth Module**:
  - Implemented **createUser** method for registering new users.
  - Added **findUserByEmail** method to retrieve users by their email address.
  - Created **EmailType** utility function for validating email format.
  - Implemented **UserService Interface** in the Auth module to decouple logic between Auth and User services.
  - Successfully connected **AuthService** and **UserService** for better service interaction.

### Updated
- **UserDTO**:
  - Updated User DTO to include necessary fields for user creation and retrieval operations.
- **Error Handling**:
  - Enhanced error handling in **createUserProfile** method with specific messages for invalid inputs and database issues.
  - Improved exception handling for user-related services to provide clearer responses to clients.

---

## [0.2.1] - 2024-11-15

### Added
- **User Management**:
  - Created **User DTO** for defining the structure of user data in requests.
  - Implemented **User Routes** to manage user-related actions:
    - **GET /api/users/:id** - Retrieve user profile information.
    - **PATCH /api/users/:id** - Update user profile information.
    - **DELETE /api/users/:id** - Delete user account.
  - Created **Auth DTO** to validate and structure authentication-related data.
  - Implemented **Error Handling Decorator** for method-level error handling and logging using the `HandleError` decorator.
  - Integrated **Bcrypt** for secure password hashing and comparison, ensuring password security.

## [0.2.0] - 2024-11-14

### Added
- **Docker and Jenkins Setup**:
  - Created a `docker-compose.yml` file to manage dependencies, including:
    - **Jenkins** for CI/CD pipeline management.
    - **PostgreSQL** as the primary database.
    - **Mailhog** for testing email workflows.
    - **Redis** for caching or session management.
  - Configured Jenkins to connect with GitHub and tested a successful build to ensure continuous integration functionality.

- **Logging and Monitoring**:
  - Implemented custom logging using **NestJS-Pino** and **nestjs-flub** for structured and efficient logging.
  - Added logging configurations to capture detailed information, supporting easier debugging and tracking of requests.

### Updated
- **Environment Validation**:
  - Fine-tuned environment variable validation with `class-validator` to enforce secure and complete configuration setup.

## [0.1.1] - 2024-11-13

### Added
- **Database Configuration**:
  - Configured PostgreSQL as the main database for the application.
  - Integrated TypeORM with `TypeOrmModule` setup for managing database connections and entities.
  - Verified successful connection of the app to PostgreSQL.

## [0.1.0] - 2024-11-10

### Added
- Initial NestJS setup for backend infrastructure.
- Environment variable validation using `class-validator` to ensure secure configuration loading.
- Custom error handling for environment validation to simplify debugging during setup.

---

