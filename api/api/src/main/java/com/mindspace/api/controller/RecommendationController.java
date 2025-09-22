package com.mindspace.api.controller;
import com.mindspace.api.entity.Recommendation;
import com.mindspace.api.entity.User;
import com.mindspace.api.repository.UserRepository;
import com.mindspace.api.service.RecommendationService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserRepository userRepository;

    public RecommendationController(RecommendationService recommendationService, UserRepository userRepository) {
        this.recommendationService = recommendationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<List<Recommendation>> generateRecs(
            @PathVariable Long userId, 
            @RequestParam String mood,
            HttpServletRequest request) {
        
        try {
            System.out.println("=== RECOMMENDATION REQUEST ===");
            System.out.println("UserId: " + userId);
            System.out.println("Mood: " + mood);
            
            // Read the raw request body
            String content = "";
            try (java.io.BufferedReader reader = request.getReader()) {
                content = reader.lines().collect(java.util.stream.Collectors.joining("\n"));
            }
            
            System.out.println("Content: " + content);
            
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Recommendation> recommendations = recommendationService
                    .generateAndSaveRecommendations(user, content, mood);
            
            System.out.println("SUCCESS: Generated " + recommendations.size() + " recommendations");
            return ResponseEntity.ok(recommendations);
            
        } catch (Exception e) {
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.ok(List.of());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Recommendation>> getRecs(@PathVariable Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Recommendation> recommendations = recommendationService.getUserRecommendations(user);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            System.err.println("Error fetching recommendations: " + e.getMessage());
            return ResponseEntity.ok(List.of());
        }
    }
}