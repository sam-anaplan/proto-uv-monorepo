FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container
COPY --from=packages welcome /packages/welcome
COPY . /app

# Install the application dependencies.
WORKDIR /app
RUN uv sync --frozen --no-cache
# The command 'uv sync --frozen --no-cache' uses the 'uv' tool to install the Python dependencies
# specified in the application's dependency files (like requirements.txt or pyproject.toml).
# The '--frozen' flag ensures that the exact versions of the dependencies are installed as specified,
# preventing any automatic upgrades. The '--no-cache' flag disables the use of any cached packages,
# ensuring that the latest versions are fetched from the package index.

# Run the application.
CMD ["/app/.venv/bin/fastapi", "run", "app/main.py", "--port", "80", "--host", "0.0.0.0"]
