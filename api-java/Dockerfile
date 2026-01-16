
# Use a minimal Java runtime base image
FROM eclipse-temurin:21

# Set the working directory inside the container
WORKDIR /app

ARG JAR_FILE
# Copy the built JAR file into the container
COPY ${JAR_FILE} app.jar

# Expose port 8080
EXPOSE 8080

ARG ALLOWED_ORIGIN
RUN export ALLOWED_ORIGIN=${ALLOWED_ORIGIN}

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

