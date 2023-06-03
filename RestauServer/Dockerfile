FROM openjdk:17-slim

# Set environment variables for MySQL connection
ENV DB_HOST=mysql-host
ENV DB_PORT=3306
ENV DB_NAME=testdb
ENV DB_USER=root
ENV DB_PASSWORD=

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Set the working directory in the container
WORKDIR /app

# Copy the application JAR file to the container
COPY ./target/polls-0.0.1-SNAPSHOT.jar polls-0.0.1-SNAPSHOT.jar

# Expose the port your application listens on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "polls-0.0.1-SNAPSHOT.jar"]