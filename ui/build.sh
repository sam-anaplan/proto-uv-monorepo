DOCKER_IMAGE_NAME="task-api"
OLD_NPM_VERSION=$(npm pkg get version | sed 's/"//g')

docker buildx build -f Dockerfile-build -t $DOCKER_IMAGE_NAME-build .

npm version patch
NPM_VERSION=$(npm pkg get version | sed 's/"//g')
echo 📃 Built new version $NPM_VERSION 📃

docker buildx build -f Dockerfile-deploy -t $DOCKER_IMAGE_NAME .

docker tag $DOCKER_IMAGE_NAME $DOCKER_IMAGE_NAME:v$NPM_VERSION
