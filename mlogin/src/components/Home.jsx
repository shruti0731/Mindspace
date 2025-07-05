import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">Welcome to Mindspace</h1>
        <p className="hero-subtitle">Your personal mental health journal and wellness tracker.</p>
        <a href="/login" className="cta-button">Get Started</a>
      </section>

      <section className="features">
        <h2>Why Mindspace?</h2>
        <div className="features-grid">
          <div className="feature-card card-1">
            <h3>Daily Journaling</h3>
            <p>Write your thoughts, feelings, and moods. Mindspace offers a safe space to reflect and grow.</p>
          </div>
          <div className="feature-card card-2">
            <h3>Mood Tracking</h3>
            <p>Track your mental wellness with visuals and stats. Notice patterns and progress over time.</p>
          </div>
          <div className="feature-card card-3">
            <h3>Mindfulness Tools</h3>
            <p>Access guided prompts, breathing exercises, and reminders to stay grounded and present.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
