pushd api-1
uv sync --frozen --no-cache
popd

pushd api-2
uv sync --frozen --no-cache
popd

pushd ui
npm ci
popd
