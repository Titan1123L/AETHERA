package com.example.backend.controller;

import com.example.backend.dto.SignupRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.LoginRequest;

import com.example.backend.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthController(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
) {

    this.userRepository = userRepository;

    this.passwordEncoder = passwordEncoder;

    this.jwtService = jwtService;
}

    @PostMapping("/signup")
    public String signup(
            @RequestBody SignupRequest request
    ) {

        // EMAIL EXISTS
        if (
            userRepository.findByEmail(
                    request.getEmail()
            ) != null
        ) {

            return "Email already exists";
        }

        // CREATE USER
        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        // ENCRYPT PASSWORD
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // SAVE USER
        userRepository.save(user);

        return "User registered successfully";
    }
    @PostMapping("/login")
public String login(
        @RequestBody LoginRequest request
) {

    // FIND USER
    User user =
            userRepository.findByEmail(
                    request.getEmail()
            );

    // CHECK USER EXISTS
    if (user == null) {

        return "User not found";
    }

    // CHECK PASSWORD
    boolean passwordMatches =
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            );

    if (!passwordMatches) {

        return "Invalid password";
    }

    // GENERATE JWT TOKEN
    return jwtService.generateToken(
            user.getEmail()
    );
}
@GetMapping("/profile")
public String profile(
        HttpServletRequest request
) {

    Object email =
            request.getAttribute(
                    "email"
            );

    if (email == null) {

        return "Unauthorized";
    }

    return "Welcome " + email;
}
}