# Stage 1: Create Layer for Dependencies and then buildd
FROM maven:3.9.6-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src /app/src
RUN mvn clean install

# Stage 2: Runtime Image
FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/greensync_backend-0.0.1.jar ./greensync_backend-0.0.1.jar
CMD ["java", "-jar", "greensync_backend-0.0.1.jar"]
