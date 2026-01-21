# ui

Angular frontend application for the task management system.

## Purpose

This application provides a web interface for managing tasks. It demonstrates:
- Angular standalone components architecture
- Consuming multiple backend APIs (api-1 and api-2)
- Docker containerisation with nginx for deployment
- Two-stage Docker build (build + deploy)

## Architecture

```
ui/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Root component
│   │   ├── app.config.ts         # Application configuration
│   │   ├── app.routes.ts         # Route definitions
│   │   ├── task.service.ts       # API client for api-1
│   │   ├── number.service.ts     # API client for api-2
│   │   ├── dto/                  # Data Transfer Objects
│   │   ├── model/                # Domain models
│   │   └── [components]/         # UI components
│   ├── index.html
│   └── styles.css
├── angular.json                  # Angular CLI configuration
├── package.json                  # Node.js dependencies
├── Dockerfile-build              # Build stage container
├── Dockerfile-deploy             # Production nginx container
└── nginx.conf                    # nginx configuration
```

## Development

### Install dependencies

```bash
npm ci
```

### Run locally

```bash
ng serve
```

The application will be available at http://localhost:4200

### Run tests

```bash
ng test
```

## Docker

### Build

```bash
docker buildx build -f Dockerfile-build -t task-ui-build .
docker buildx build -f Dockerfile-deploy -t task-ui .
```

### Run

```bash
docker run -p 10666:80 task-ui
```

The application will be available at http://localhost:10666/task-list

## Backend Services

This UI communicates with:
- **api-1** (http://localhost:10667) - Task management API
- **api-2** (http://localhost:10668) - Random number API

---

# Angular CLI Reference

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
