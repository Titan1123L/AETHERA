package com.example.backend.security;

import com.example.backend.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtFilter(
            JwtService jwtService
    ) {

        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain
    )
            throws ServletException,
            IOException {

        String authHeader =
                request.getHeader(
                        "Authorization"
                );

        if (
                authHeader != null &&
                authHeader.startsWith("Bearer ")
        ) {

            String token =
                    authHeader.substring(7);

            try {
                System.out.println("TOKEN: " + token);

                String email =
                        jwtService.extractEmail(
                                token
                        );
                System.out.println("EMAIL: " + email);

                request.setAttribute(
                        "email",
                        email
                );

            } catch (Exception e) {

                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED
                );

                return;
            }
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}