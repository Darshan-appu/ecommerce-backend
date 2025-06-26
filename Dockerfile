FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# ✅ Give execute permission to the Maven wrapper
RUN chmod +x mvnw

# Build the jar explicitly
RUN ./mvnw clean package -DskipTests

# Run the correct jar file
CMD ["java", "-jar", "target/back-0.0.1-SNAPSHOT.jar"]
