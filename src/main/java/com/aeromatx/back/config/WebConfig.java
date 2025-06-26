package com.aeromatx.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all endpoints
                .allowedOriginPatterns(
                    "http://127.0.0.1:*",
                    "http://localhost:*",
                    "https://*.onrender.com",     // ✅ All Render subdomains
                    "https://*.vercel.app",       // ✅ If using Vercel for frontend
                    "https://your-frontend.com"   // ✅ Replace with actual domain
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
