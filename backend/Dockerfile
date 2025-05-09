FROM eclipse-temurin:17-jdk
COPY target/vehicle-marketplace-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]