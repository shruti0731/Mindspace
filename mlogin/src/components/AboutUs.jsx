import React from 'react';
import '../styles/AboutUs.css';

const About = () => {
  return (
    <div className="about-layout">
      <main className="about-page-bg">
        <div className="about-container">
          <h1>About Mindspace</h1>
          <p>
            Mindspace is your safe haven for expressing emotions, tracking mental health, and growing emotionally stronger each day. 
            We are on a mission to empower individuals through self-reflection, journaling, and holistic well-being tracking.
          </p>
          <p>
            Whether you're battling stress, anxiety, or just need a daily outlet for your thoughts, Mindspace offers tools tailored just for you.
          </p>
          <p>
            Built with <span style={{ color: 'red' }}>❤️</span> by a passionate team of developers and mental health advocates.
          </p>
        </div>
      </main>
  
    </div>
  );
};

export default About;
