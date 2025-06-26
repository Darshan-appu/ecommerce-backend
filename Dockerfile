FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Build the jar explicitly
RUN ./mvnw clean package -DskipTests

# Run the correct jar file
CMD ["java", "-jar", "target/back-0.0.1-SNAPSHOT.jar"]
