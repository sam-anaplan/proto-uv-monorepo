.PHONY: install sync sync-packages sync-apis sync-ui clean reinstall build build-api-1 build-api-2 build-ui run run-api-1 run-api-2 run-ui stop

# Function to sync a project
# Usage: $(call uv_sync,directory_path)
define uv_sync
	@echo "----------------------------------------"
	@echo "Syncing: $(1)"
	@echo "----------------------------------------"
	cd $(1) && uv sync
	@echo "Done: $(1)"
	@echo ""
endef

# Function to reinstall a project
# Usage: $(call uv_reinstall,directory_path)
define uv_reinstall
	@echo "----------------------------------------"
	@echo "Reinstalling: $(1)"
	@echo "----------------------------------------"
	cd $(1) && uv sync --reinstall
	@echo "Done: $(1)"
	@echo ""
endef

# Function to build a docker image
# Usage: $(call docker_build,directory_path,image_name,extra_args)
define docker_build
	@echo "----------------------------------------"
	@echo "Building Docker image: $(2)"
	@echo "----------------------------------------"
	cd $(1) && docker build $(3) -t $(2) .
	@echo "Done: $(2)"
	@echo ""
endef

# Function to run a docker container
# Usage: $(call docker_run,image_name,host_port,container_port)
define docker_run
	@echo "----------------------------------------"
	@echo "Running container: $(1) on port $(2)"
	@echo "----------------------------------------"
	docker run -d --name $(1) -p $(2):$(3) $(1)
	@echo "Done: $(1)"
	@echo ""
endef

# Install all dependencies (Python and Node.js)
install: sync sync-ui
	@echo "========================================"
	@echo "All dependencies installed successfully"
	@echo "========================================"

# Sync all Python projects (packages first, then apis that depend on them)
sync: sync-packages sync-apis
	@echo "========================================"
	@echo "All Python projects synced successfully"
	@echo "========================================"

# Sync shared packages
sync-packages:
	@echo "Starting package sync..."
	$(call uv_sync,packages/scwpoc)

# Sync API projects
sync-apis:
	@echo "Starting API sync..."
	$(call uv_sync,api-1)
	$(call uv_sync,api-2)

# Sync UI dependencies (Node.js)
sync-ui:
	@echo "----------------------------------------"
	@echo "Installing Node.js dependencies: ui"
	@echo "----------------------------------------"
	cd ui && npm ci
	@echo "Done: ui"
	@echo ""

# Clean all .venv directories and reinstall
clean:
	@echo "Removing all .venv directories..."
	rm -rf api-1/.venv api-2/.venv packages/scwpoc/.venv
	@echo "All .venv directories removed"
	@echo ""
	$(MAKE) sync

# Reinstall all (keeps venvs but reinstalls packages)
reinstall:
	@echo "Starting full reinstall..."
	$(call uv_reinstall,packages/scwpoc)
	$(call uv_reinstall,api-1)
	$(call uv_reinstall,api-2)
	@echo "========================================"
	@echo "All projects reinstalled successfully"
	@echo "========================================"

# ======================
# Docker Build Targets
# ======================

# Build all docker images
build: build-api-1 build-api-2 build-ui
	@echo "========================================"
	@echo "All Docker images built successfully"
	@echo "========================================"

# Build api-1 (requires packages context for scwpoc dependency)
build-api-1:
	@echo "Building api-1..."
	cd api-1 && docker build --build-context packages=../packages -t api-1 .
	@echo "Done: api-1"
	@echo ""

# Build api-2
build-api-2:
	$(call docker_build,api-2,api-2,)

# Build ui (two-stage build)
build-ui:
	@echo "----------------------------------------"
	@echo "Building Docker image: task-ui"
	@echo "----------------------------------------"
	cd ui && docker buildx build -f Dockerfile-build -t task-ui-build .
	cd ui && docker buildx build -f Dockerfile-deploy -t task-ui .
	@echo "Done: task-ui"
	@echo ""

# ======================
# Docker Run Targets
# ======================

# Run all containers
run: run-api-1 run-api-2 run-ui
	@echo "========================================"
	@echo "All containers started"
	@echo "  api-1:   http://localhost:10667"
	@echo "  api-2:   http://localhost:10668"
	@echo "  ui:      http://localhost:10666"
	@echo "========================================"
	@echo "Access the UI application at http://localhost:10666/task-list"

# Run api-1 container
run-api-1:
	$(call docker_run,api-1,10667,80)

# Run api-2 container
run-api-2:
	$(call docker_run,api-2,10668,80)

# Run ui container
run-ui:
	$(call docker_run,task-ui,10666,80)

# Stop and remove all containers
stop:
	@echo "Stopping and removing containers..."
	-docker stop api-1 api-2 task-ui 2>/dev/null || true
	-docker rm api-1 api-2 task-ui 2>/dev/null || true
	@echo "All containers stopped and removed"
