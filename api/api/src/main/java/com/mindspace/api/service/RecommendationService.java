package com.mindspace.api.service;

import com.mindspace.api.entity.Recommendation;
import com.mindspace.api.entity.User;
import com.mindspace.api.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public List<Recommendation> generateAndSaveRecommendations(User user, String content, String mood) {
        try {
            System.out.println("=== RecommendationService Debug ===");
            System.out.println("User: " + user.getName());
            System.out.println("Content length: " + content.length());
            System.out.println("Mood: " + mood);

            // Generate recommendations based on mood
            List<Recommendation> recommendations = generateRecommendationsByMood(user, mood, content);
            
            // Clear old recommendations for this user (optional)
            try {
                List<Recommendation> oldRecs = recommendationRepository.findByUserId(user.getId());
                if (!oldRecs.isEmpty()) {
                    recommendationRepository.deleteAll(oldRecs);
                    System.out.println("Deleted " + oldRecs.size() + " old recommendations");
                }
            } catch (Exception e) {
                System.out.println("Warning: Could not delete old recommendations: " + e.getMessage());
            }

            // Save new recommendations
            List<Recommendation> savedRecommendations = new ArrayList<>();
            for (Recommendation rec : recommendations) {
                try {
                    Recommendation saved = recommendationRepository.save(rec);
                    savedRecommendations.add(saved);
                    System.out.println("Saved recommendation: " + rec.getTitle());
                } catch (Exception e) {
                    System.err.println("Failed to save recommendation: " + rec.getTitle() + " - " + e.getMessage());
                }
            }

            System.out.println("Successfully saved " + savedRecommendations.size() + " recommendations");
            return savedRecommendations;

        } catch (Exception e) {
            System.err.println("Error in generateAndSaveRecommendations: " + e.getMessage());
            e.printStackTrace();
            // Return empty list instead of throwing exception
            return new ArrayList<>();
        }
    }

    public List<Recommendation> getUserRecommendations(User user) {
        try {
            return recommendationRepository.findByUserId(user.getId());
        } catch (Exception e) {
            System.err.println("Error fetching user recommendations: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private List<Recommendation> generateRecommendationsByMood(User user, String mood, String content) {
        List<Recommendation> recommendations = new ArrayList<>();
        
        try {
            switch (mood) {
                case "😊": // Happy
                    recommendations.addAll(getHappyRecommendations(user));
                    break;
                case "😔": // Sad
                    recommendations.addAll(getSadRecommendations(user));
                    break;
                case "😡": // Angry
                    recommendations.addAll(getAngryRecommendations(user));
                    break;
                case "😴": // Tired
                    recommendations.addAll(getTiredRecommendations(user));
                    break;
                case "😐": // Neutral
                default:
                    recommendations.addAll(getNeutralRecommendations(user));
                    break;
            }
        } catch (Exception e) {
            System.err.println("Error generating recommendations by mood: " + e.getMessage());
        }

        return recommendations;
    }

    private List<Recommendation> getHappyRecommendations(User user) {
        return Arrays.asList(
            createRecommendation(user, "Music", "Uplifting Playlist", "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0"),
            createRecommendation(user, "Activity", "Share your joy with friends", "https://www.meetup.com/"),
            createRecommendation(user, "Book", "Feel-good stories", "https://www.goodreads.com/shelf/show/feel-good")
        );
    }

    private List<Recommendation> getSadRecommendations(User user) {
        return Arrays.asList(
            createRecommendation(user, "Wellness", "Mindfulness Meditation", "https://www.headspace.com/"),
            createRecommendation(user, "Article", "Coping with Sadness", "https://www.helpguide.org/articles/depression/coping-with-depression.htm"),
            createRecommendation(user, "Activity", "Nature Walk Benefits", "https://www.alltrails.com/")
        );
    }

    private List<Recommendation> getAngryRecommendations(User user) {
        return Arrays.asList(
            createRecommendation(user, "Exercise", "Anger Management Workout", "https://www.youtube.com/results?search_query=anger+management+workout"),
            createRecommendation(user, "Technique", "Breathing Exercises", "https://www.healthline.com/health/breathing-exercises-for-anxiety"),
            createRecommendation(user, "Article", "Managing Anger", "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434")
        );
    }

    private List<Recommendation> getTiredRecommendations(User user) {
        return Arrays.asList(
            createRecommendation(user, "Sleep", "Sleep Hygiene Tips", "https://www.sleepfoundation.org/sleep-hygiene"),
            createRecommendation(user, "Relaxation", "Gentle Yoga", "https://www.youtube.com/results?search_query=gentle+yoga+for+relaxation"),
            createRecommendation(user, "Wellness", "Energy Boosting Foods", "https://www.healthline.com/nutrition/27-energy-boosting-foods")
        );
    }

    private List<Recommendation> getNeutralRecommendations(User user) {
        return Arrays.asList(
            createRecommendation(user, "Learning", "New Skill Development", "https://www.coursera.org/"),
            createRecommendation(user, "Book", "Personal Development", "https://www.goodreads.com/shelf/show/personal-development"),
            createRecommendation(user, "Activity", "Creative Hobbies", "https://www.pinterest.com/search/pins/?q=creative%20hobbies")
        );
    }

    private Recommendation createRecommendation(User user, String category, String title, String url) {
        Recommendation rec = new Recommendation();
        rec.setUser(user);
        rec.setCategory(category);
        rec.setTitle(title);
        rec.setUrl(url);
        return rec;
    }
}