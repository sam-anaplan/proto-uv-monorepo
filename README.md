# Prototype project for uv-managed python monorepo

Adapted from previous personal protype repo for containerised deployment of applications.

## Overview
This is a prototype monorepo project to demonstrate use of `uv` tool to manage multiple python applications with different dependencies in a single repository.

The applications are containerised using docker for deployment.

## Structure
- `ui/`
    - Angular frontend application -- included for completeness from previous fork, not relevant to the prototype itself
- `api-1/`
    - A python api application  
    - `pyproject.toml` defines its dependencies independently of other applications
- `api-2/`
    - Another python api application with different dependencies
    - `pyproject.toml` defines its dependencies independently of other applications
- `packages/`
    - Shared python packages used by the api applications
- `api-java/`
    - A java api application with its own dependencies. This was in the original project not relevant to this prototype but currently left in place as an example of multi-language monorepo structure.
    - At the moment this is here for reference purposes and not included in the build scripts.
    
## Environment setup

### Using mise (recommended)

[mise](https://mise.jdx.dev/) manages tool versions and provides task automation.

1. Install mise: https://mise.jdx.dev/getting-started.html
2. From the repo root, run:
   ```bash
   mise trust
   mise install
   ```

This will install the correct versions of Python, Node.js, and uv automatically.

### Manual setup

If not using mise, install the following manually:
- **uv**: https://docs.astral.sh/uv/getting-started/installation/
- **Python 3.12**
- **Node.js 24** (for UI development)
- **Docker**: https://docs.docker.com/get-docker/

## Building and running the applications

The project uses `mise` for task automation.

### Quick start

```bash
mise run setup      # Install all dependencies
mise run build      # Build all Docker images
mise run up         # Start all containers
```

### Available tasks

Run `mise tasks` to see all available tasks, or use:

| Command | Description |
|---------|-------------|
| `mise run setup` | Install all dependencies (Python and Node.js) |
| `mise run sync` | Sync all Python virtual environments |
| `mise run clean` | Remove all `.venv` directories and reinstall fresh |
| `mise run reinstall` | Reinstall all packages without removing venvs |
| `mise run build` | Build all Docker images (api-1, api-2, ui) |
| `mise run up` | Start all containers in detached mode |
| `mise run down` | Stop and remove all running containers |
| `mise run restart` | Restart all containers |
| `mise run test` | Run all tests |

### Individual tasks

You can also build or run individual components:
- `mise run build-api-1`, `mise run build-api-2`, `mise run build-ui`
- `mise run up-api-1`, `mise run up-api-2`, `mise run up-ui`
- `mise run sync-packages`, `mise run sync-api-1`, `mise run sync-api-2`, `mise run sync-ui`

### Development mode

- `mise run dev-api-1` - Run api-1 with hot reload
- `mise run dev-api-2` - Run api-2 with hot reload
- `mise run dev-ui` - Run UI dev server

### Accessing the applications

- The ui application will be accessible in a browser at:
    - http://localhost:10666/task-list
- The api applications will be accessible at:
    - **api-1**: http://localhost:10667
    - **api-2**: http://localhost:10668

## Currently incomplete

- terraform. This was started but fell by the wayside before forking this repo. Left in place for now in case prototyping terraform with uv-managed monorepo is desired later.
