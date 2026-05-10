FROM maven:3.9-eclipse-temurin-25 AS builder
WORKDIR /workspace
COPY apps/api/pom.xml .
RUN mvn -B dependency:go-offline
COPY apps/api/src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=builder /workspace/target/api-0.1.0-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
