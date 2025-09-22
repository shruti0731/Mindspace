package com.mindspace.api.controller;

import com.mindspace.api.dto.LoginRequest;
import com.mindspace.api.dto.SignUpRequest;
import com.mindspace.api.entity.User;
import com.mindspace.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from your React app
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        // Create new user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if password matches
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // On successful login, return user data (excluding password)
                user.setPassword(null); // Do not send password to the client
                return ResponseEntity.ok(user);
            }
        }

        return new ResponseEntity<>("Invalid email or password!", HttpStatus.UNAUTHORIZED);
    }
}
