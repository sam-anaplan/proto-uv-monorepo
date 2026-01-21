# api-2

Random number generation API service built with FastAPI.

## Purpose

This service provides a REST API for generating random numbers. It demonstrates:
- A standalone FastAPI application with no shared package dependencies
- Independent virtual environment management with `uv`
- Docker containerisation for deployment
- Using numpy for numerical operations

## Architecture

```
api-2/
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
| GET | `/number/random/{max}` | Returns a random number between 0 and max |

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
docker build -t api-2 .
```

### Run

```bash
docker run -p 10668:80 api-2
```

The API will be available at http://localhost:10668

## Dependencies

- **fastapi[standard]** - Web framework
- **numpy** - Numerical computing library
