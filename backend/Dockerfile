FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy toàn bộ mã nguồn
COPY . .
# Build project để tạo file JAR
RUN ./mvnw clean package -DskipTests
# Đổi tên file JAR (không cần COPY lại)
RUN mv target/vehicle-marketplace-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]