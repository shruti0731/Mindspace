package com.mindspace.api.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "journals")
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String content;
    private String mood;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Journal() {}

    public Journal(LocalDate date, String content, String mood, User user) {
        this.date = date;
        this.content = content;
        this.mood = mood;
        this.user = user;
    }

    // Getters and setters
    public Long getId() { return id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
