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
        if (
            userRepository.findByEmail(
                    request.getEmail()
            ) != null
        ) {

            return "Email already exists";
        }

        
        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

       
        userRepository.save(user);

        return "User registered successfully";
    }
    @PostMapping("/login")
public String login(
        @RequestBody LoginRequest request
) {

    User user =
            userRepository.findByEmail(
                    request.getEmail()
            );

 
    if (user == null) {

        return "User not found";
    }

    boolean passwordMatches =
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            );

    if (!passwordMatches) {

        return "Invalid password";
    }

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