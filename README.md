# Prototype project for uv-managed python monorepo

Adapted from previous personal prototype repo for containerised deployment of applications.

## Overview

This is a prototype monorepo project to demonstrate use of `uv` to manage multiple python applications with different dependencies in a single repository.

Applications are containerised with Docker and deployed to a local Kubernetes cluster using [kind](https://kind.sigs.k8s.io/) and [Helm](https://helm.sh/).

## Structure

- `ui/` — Angular frontend application
- `api-1/` — Python API application (`pyproject.toml` defines its dependencies independently)
- `api-2/` — Another Python API application with different dependencies
- `packages/` — Shared python packages used by the API applications
- `helm/uv-monorepo/` — Helm chart for Kubernetes deployment
- `kind-config.yaml` — kind cluster configuration with port mappings
- Unused/incomplete (left from the original fork for reference):
    - `api-java/` — A java api application
    - `terraform/` — Incomplete, left in case it's useful later

## Environment setup

### Using mise (recommended)

[mise](https://mise.jdx.dev/) manages tool versions and provides task automation. Like `make` but moreso.

1. Install mise: https://mise.jdx.dev/getting-started.html
2. From the repo root, run:
   ```bash
   mise trust
   mise install
   ```
This will install the correct versions of Python, Node.js, uv, kubectl, kind, and helm automatically.

NOTE: I had issues getting `tilt` to install via mise, so this should be done manually:

   ```bash
   brew install tilt
   ```

### Manual setup

If not using mise, install the following manually:
- **uv**: https://docs.astral.sh/uv/getting-started/installation/
- **Python 3.12**
- **Node.js 24** (for UI development)
- **Docker**: https://docs.docker.com/get-docker/
- **kubectl**: https://kubernetes.io/docs/tasks/tools/
- **kind**: https://kind.sigs.k8s.io/docs/user/quick-start/#installation
- **helm**: https://helm.sh/docs/intro/install/
- **tilt**

## Building and deploying

The project uses `mise` for task automation. Run `mise tasks` to see all available tasks.

### Quick start

```bash
mise run setup          # Install all dependencies
mise run build          # Build all Docker images
mise run k8s-create     # Create the kind cluster
mise run k8s-load       # Load images into kind

# to deploy the cluster (static)
mise run k8s-deploy     # Deploy via Helm

# alternatively, to run via tilt
tilt up # or `mise tilt-up`, which is more verbose but included for self-documenting purposese
```

### Available tasks

| Command | Description |
|---------|-------------|
| `mise run setup` | Install all dependencies (Python and Node.js) |
| `mise run sync` | Sync all Python virtual environments |
| `mise run clean` | Remove all `.venv` directories and reinstall fresh |
| `mise run reinstall` | Reinstall all packages without removing venvs |
| `mise run build` | Build all Docker images (api-1, api-2, ui) |
| `mise run test` | Run all tests |
| `mise run k8s-create` | Create the kind cluster |
| `mise run k8s-load` | Load Docker images into the kind cluster |
| `mise run k8s-deploy` | Deploy (or upgrade) to Kubernetes via Helm |
| `mise run k8s-status` | Show pod and service status |
| `mise run k8s-teardown` | Uninstall the Helm release |
| `mise run tilt-up` | Start tilt dev environment|
| `mise run tilt-down` | Stop tilt dev environment |

### Build tasks

You can build individual components:
- `mise run build-wheels`, `mise run build-welcome-wheel`, `mise run build-images`
- `mise run build-api-1`, `mise run build-api-2`, `mise run build-ui`

Sync individual projects:
- `mise run sync-packages`, `mise run sync-api-1`, `mise run sync-api-2`, `mise run sync-ui`

### Accessing the applications

Once deployed, the applications are accessible at:
- **UI**: http://localhost:10666/task-list
- **api-1**: http://localhost:10667 (direct, for debugging)
- **api-2**: http://localhost:10668 (direct, for debugging)

The UI's nginx reverse proxy routes `/api/tasks/*` to api-1 and `/api/numbers/*` to api-2 within the cluster, so the browser only needs to talk to the UI on port 10666.

