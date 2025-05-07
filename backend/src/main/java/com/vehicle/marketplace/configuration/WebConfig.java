package com.vehicle.marketplace.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Phục vụ file từ thư mục uploads/
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }

}