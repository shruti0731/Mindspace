import React, { useState } from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for reaching out, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-layout">
      <main className="contact-page">
        <div className="contact-container">
          <h1>GET IN TOUCH</h1>
          <p className="contact-subtitle">Have a question, feedback, or just want to say hi? We're here to listen.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
