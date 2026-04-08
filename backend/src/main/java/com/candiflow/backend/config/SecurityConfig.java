package com.candiflow.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Classe de configuration Spring Security
public class SecurityConfig {

    @Bean // Bean qui définit les règles de sécurité
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Active le CORS communiquer avec le front
                .cors(cors -> {})

                // Désactive la protection CSRF
                .csrf(csrf -> csrf.disable())

                // Autorise toutes les requêtes 
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}