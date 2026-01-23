FROM python:3.12-slim

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy the application into the container
COPY *.whl ./
COPY dist/*.whl ./

COPY pyproject.toml uv.lock ./

# Export dependencies from lock file (ensures same versions as dev)
RUN uv export --frozen --no-emit-project --no-sources > requirements.txt

RUN uv pip install --system -r requirements.txt

RUN uv pip install --system ./*.whl

# Run the application (using module path since app is installed from wheel)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
