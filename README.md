# Mindspace

Mindspace is a full-stack wellness platform designed to help users track their mood, gain insights and stay mindful.  
This README explains the application architecture, each major page’s functionality and setup instructions.

---

## 📂 Project Overview
Mindspace is built with a **React** frontend and a **Spring Boot** backend. 

Key features include:

- Secure authentication and protected routes  
- RESTful APIs for user management and mood tracking  
- Responsive, mobile-friendly UI  

---

## 🏠 Homepage
The homepage is the welcoming entry point.

**Non-technical**  
- Presents a clean, calming design to encourage a positive first impression.  
- Highlights core features such as mood tracking, insights, and personalized dashboard.  
- Provides quick navigation to signup/login and information sections.

**Technical**  
- Built with React functional components and CSS for responsive layout.  
- Fetches featured content from the backend via a REST API.  
- Uses React Router for seamless navigation without page reloads.


`![Homepage](screenshots/homepage1.png)`


---

## ℹ️ About Us Page
**Non-technical**  
- Shares the story, mission, and team behind Mindspace.  
- Builds trust and explains the purpose of the application.

**Technical**  
- Static content served as a React page with markdown-like rich text.  
- Responsive grid layout ensures readability on all devices.  
- No backend calls, enabling quick load times.

_Add screenshot here_  
`![About Us](screenshots/aboutus.png)`

---

## 📞 Contact Us Page
**Non-technical**  
- Provides a simple form for users to send feedback or questions.  
- Includes location or email links for direct communication.

**Technical**  
- React form with controlled components for real-time validation.  
- POSTs data to a Spring Boot endpoint that sends emails (via SMTP) or stores messages in a database.  
- Form input is sanitized and validated on both client and server.

_Add screenshot here_  
`![Contact Us](screenshots/contactus.png)`

---

## 🔑 Signup / Login Page
**Non-technical**  
- Allows users to create an account or securely log in.  
- Offers clear feedback on success or failure (e.g., wrong password).

**Technical**  
- React + Context API for managing authentication state.  
- Communicates with backend `/api/auth` endpoints using JWT for secure sessions.  
- Passwords are hashed using Spring Security’s `BCryptPasswordEncoder`.  
- Includes client-side validation and protected routes.

_Add screenshot here_  
`![Signup/Login](screenshots/signup-login.png)`

---

## 📊 Dashboard Page
**Non-technical**  
- Personalized hub showing a summary of user activity and quick links to key features.  
- Displays daily mood logs, quick insights, and motivational content.

**Technical**  
- React dashboard uses reusable components and charts (e.g., Chart.js/Recharts).  
- Fetches user-specific data via authenticated REST calls.  
- Implements lazy loading to optimize performance.

_Add screenshot here_  
`![Dashboard](screenshots/dashboard.png)`

---

## 🌈 Mood Insights Page
**Non-technical**  
- Lets users record moods and view trends over time.  
- Provides suggestions or mindfulness tips based on mood history.

**Technical**  
- Interactive forms and dynamic data visualization (e.g., line/bar charts).  
- Backend stores mood entries in a relational database (MySQL/PostgreSQL).  
- Insights generated using simple analytics (average mood score, streaks).  
- Protected route ensures only authenticated users can access their data.

_Add screenshot here_  
`![Mood Insights](screenshots/moodinsights.png)`

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Axios, React Router  
- **Backend**: Spring Boot, Spring Security, JPA/Hibernate  
- **Database**: MySQL  
- **Deployment**: Docker, GitHub Actions (optional CI/CD)  

---

## 🚀 Getting Started
### Prerequisites
- Node.js ≥ 18  
- Java ≥ 17  
- Docker (optional for containerized deployment)  
- MySQL server

### Setup
1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/mindspace.git
   cd mindspace
   ```

2. **Backend**  
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Frontend**  
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the app at `http://localhost:3000`.

---

## 📸 Screenshots
Replace each placeholder in the sections above with your actual screenshots, for example:
```
![Homepage](screenshots/homepage.png)
```

---

## 📜 License
This project is licensed under the MIT License – see [LICENSE](LICENSE) for details.
