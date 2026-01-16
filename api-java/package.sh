#!/bin/bash

set -e

TARGET_DIR="target"
DOCKER_IMAGE_NAME="task-api"
ALLOWED_ORIGIN="http://localhost:10666"

echo "📃 Determining version number..."

CURRENT_VERSION=$(mvn help:evaluate -Dexpression=project.version -q -DforceStdout)
VERSION_PREFIX=$(echo $CURRENT_VERSION | cut -d'.' -f1-2)
BUILD_NUM=$(echo $CURRENT_VERSION | cut -d'.' -f3)
NEW_BUILD_NUM=$((BUILD_NUM + 1))

NEW_VERSION="${VERSION_PREFIX}.${NEW_BUILD_NUM}"

echo "📃 setting new build number to be ${NEW_VERSION} 📃"
mvn versions:set -DnewVersion=$NEW_VERSION

echo "🔨 Building the app with Maven..."
./mvnw clean package

JAR_FILE=$(ls target/*.jar)
echo 📦 found JAR file: $JAR_FILE

echo "🐳 Building Docker Image file..."
docker buildx build \
    -t $DOCKER_IMAGE_NAME \
    --build-arg JAR_FILE=$JAR_FILE \
    --build-arg ALLOWED_ORIGIN=$ALLOWED_ORIGIN .

echo "✅ Docker image built successfullly."

docker tag $DOCKER_IMAGE_NAME $DOCKER_IMAGE_NAME:v$NEW_VERSION
