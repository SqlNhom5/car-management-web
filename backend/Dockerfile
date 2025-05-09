# Sử dụng image Java 17 (hoặc phiên bản phù hợp với ứng dụng của bạn)
FROM openjdk:17-jdk-slim

# Đặt thư mục làm việc
WORKDIR /app

# Copy file JAR vào container
COPY target/Vehicle-marketplace-0.0.1-SNAPSHOT.jar app.jar

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]