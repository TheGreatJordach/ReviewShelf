In a newly created `CHANGELOG.md`, it's common to start with a brief overview and an initial entry for the current version, summarizing the main features, initial setup, or structure of the project at this stage. Here's a suggested structure for the initial `CHANGELOG.md`:

---

# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]
- This section will track planned or in-progress changes and updates before the next official release.

## [0.1.0] - YYYY-MM-DD

### Added
- Initial setup of the project structure.
- Environment validation using `class-validator` for sensitive variables (e.g., `DATASOURCE_USERNAME`, `DATASOURCE_PASSWORD`).
- Custom `loadValidatedEnv` function to handle and validate environment variables with detailed error reporting.
- Configurable and detailed exception handling for missing or invalid environment variables.

---

### Additional Notes:
As the project progresses, you can add entries under the `Added`, `Fixed`, `Changed`, `Removed`, and `Security` sections for each version. For example:

- **Added**: New features, libraries, or components.
- **Fixed**: Bugs or issues that have been resolved.
- **Changed**: Modified functionality or structure of existing features.
- **Removed**: Features or components that have been removed from the codebase.
- **Security**: Any important security fixes or updates.

This structure helps team members and future collaborators understand the project’s history and key milestones at a glance.
