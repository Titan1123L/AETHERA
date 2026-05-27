package com.example.backend.config;

import com.example.backend.security.JwtFilter;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(
            JwtFilter jwtFilter
    ) {

        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            // DISABLE CSRF
            .csrf(csrf -> csrf.disable())

            // DISABLE FORM LOGIN
            .formLogin(form -> form.disable())

            // DISABLE BASIC AUTH
            .httpBasic(basic -> basic.disable())

            // STATELESS JWT
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // ROUTES
            .authorizeHttpRequests(auth -> auth

                // PUBLIC ROUTES
                .requestMatchers(
                        "/api/auth/**",
                        "/api/weather/**"
                ).permitAll()

                // EVERYTHING ELSE ALLOWED
                .anyRequest().permitAll()
            );

        // ADD JWT FILTER
        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}