# Deploy the Helm chart
k8s_yaml(helm('helm/uv-monorepo'))

# --- api-2 (simplest -- no special dependencies) ---
docker_build(
    'api-2',
    'api-2',
    live_update=[
        sync('api-2/app', '/app/app'),
    ],
)
k8s_resource('api-2', port_forwards='10668:80')

# --- api-1 ---
# Context is repo root so we can include both api-1/ and packages/welcome/
docker_build(
    'api-1',
    '.',
    dockerfile='api-1/Dockerfile',
    only=['api-1/', 'packages/welcome/'],
    live_update=[
        sync('api-1/app', '/app/app'),
        sync('packages/welcome/welcome', '/packages/welcome/welcome'),
    ],
)
k8s_resource('api-1', port_forwards='10667:80')

# --- UI (two-stage build) ---
# Combine into a single docker_build or use custom_build
custom_build(
    'task-ui',
    command='cd ui && docker buildx build -f Dockerfile-build -t task-ui-build . && docker buildx build -f Dockerfile-deploy -t $EXPECTED_REF .',
    deps=['ui/src', 'ui/package.json', 'ui/angular.json', 'ui/nginx.conf'],
)
k8s_resource('task-ui', port_forwards='10666:80')
