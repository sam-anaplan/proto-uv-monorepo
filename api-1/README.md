# api-1

Task management API service built with FastAPI.

## Purpose

This service provides a REST API for managing tasks (todo items). It demonstrates:
- FastAPI application structure with DTOs, models, and services
- Consuming shared packages from the monorepo (`welcome`)
- Independent virtual environment management with `uv`
- Docker containerisation for deployment

## Architecture

```
api-1/
├── app/
│   ├── main.py           # FastAPI application entry point
│   ├── dto/              # Data Transfer Objects
│   ├── model/            # Domain models
│   └── services/         # Business logic
├── pyproject.toml        # Dependencies and configuration
├── Dockerfile            # Container build instructions
└── .dockerignore         # Files excluded from container
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Returns hello message (from welcome package) |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a new task |
| DELETE | `/tasks/{id}` | Delete a task |

## Development

### Install dependencies

```bash
uv sync --group dev
```

### Run locally

```bash
uv run fastapi dev
```

The API will be available at http://localhost:8000

### Run tests

```bash
uv run pytest
```

## Docker

### Build

```bash
docker build --build-context packages=../packages -t api-1 .
```

### Run

```bash
docker run -p 10667:80 api-1
```

The API will be available at http://localhost:10667

## Dependencies

- **fastapi[standard]** - Web framework
- **welcome** - Shared package (local path dependency)
