package com.mindspace.api.dto;

public class RecommendationRequest {
    private String content;
    
    // Default constructor
    public RecommendationRequest() {}
    
    // Constructor with parameters
    public RecommendationRequest(String content) {
        this.content = content;
    }
    
    // Getter
    public String getContent() {
        return content;
    }
    
    // Setter
    public void setContent(String content) {
        this.content = content;
    }
    
    @Override
    public String toString() {
        return "RecommendationRequest{" +
                "content='" + content + '\'' +
                '}';
    }
}