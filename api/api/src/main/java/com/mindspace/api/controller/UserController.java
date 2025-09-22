package com.mindspace.api.controller;

import com.mindspace.api.entity.User;
import com.mindspace.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // return logged-in user (for demo, always userId=1)
    @GetMapping("/me")
    public ResponseEntity<User> getLoggedInUser() {
        return userRepository.findById(1L) // replace with actual auth user later
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
