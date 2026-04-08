package com.candiflow.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration 
public class CorsConfig {

    @Bean 
    public CorsConfigurationSource corsConfigurationSource() {

        // Objet qui contient la configuration CORS
        CorsConfiguration configuration = new CorsConfiguration();

        // Autorise les requêtes venant du front React
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Autorise les méthodes HTTP nécessaires
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Autorise tous les headers 
        configuration.setAllowedHeaders(List.of("*"));

        // Permet d'appliquer la config à toutes les routes de l'API
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}