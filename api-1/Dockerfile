FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY packages/welcome /packages/welcome

COPY api-1 /app
WORKDIR /app

RUN uv sync --frozen --no-cache

CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
