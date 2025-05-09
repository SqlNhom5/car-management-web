FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy toàn bộ project vào container
COPY . .
# Build project để tạo file JAR
RUN ./mvnw clean package -DskipTests
# Copy file JAR đã build vào container
COPY target/Vehicle-marketplace-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]