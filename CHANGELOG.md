# Changelog

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
