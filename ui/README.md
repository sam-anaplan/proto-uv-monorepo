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
