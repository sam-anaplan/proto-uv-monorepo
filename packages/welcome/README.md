# welcome

Shared Python package for the proto-uv-monorepo project.

## Purpose

This package contains shared utilities and functions used across multiple API services in the monorepo. It demonstrates how to structure reusable code as a local package managed by `uv`.

## Architecture

```
welcome/
├── src/
│   └── welcome/
│       ├── __init__.py
│       └── hello.py      # Shared utility functions
├── tests/
│   └── test_hello.py     # Unit tests
└── pyproject.toml        # Package configuration
```

## Usage

This package is consumed by other projects in the monorepo (e.g., api-1) as a path dependency:

```toml
# In consumer's pyproject.toml
[tool.uv.sources]
welcome = { path = "../packages/welcome", editable = true }
```

## Development

### Install dependencies (including dev)

```bash
uv sync --group dev
```

### Run tests

```bash
uv run pytest
```

## Dependencies

- **pyfiglet** - ASCII art text generation

## Dev Dependencies

- **pytest** - Testing framework
