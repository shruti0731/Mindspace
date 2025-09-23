import React, { useState } from "react";
import "../styles/FullGraph.css";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FullGraph = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, journals } = location.state || { user: null, journals: [] };

  const [filter, setFilter] = useState("all");
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => navigate("/");

  const moodMap = { "😊": 5, "😐": 3, "😔": 2, "😡": 1, "😴": 0 };

  const filterJournals = () => {
    if (filter === "week") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return journals.filter((j) => new Date(j.date) >= lastWeek);
    } else if (filter === "month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return journals.filter((j) => new Date(j.date) >= lastMonth);
    } else if (filter === "year") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return journals.filter((j) => new Date(j.date) >= lastYear);
    }
    return journals;
  };

  const filteredJournals = filterJournals();

  const chartData = {
    labels: filteredJournals.map((j) => j.date).reverse(),
    datasets: [
      {
        label: "Mood Tracking",
        data: filteredJournals.map((j) => moodMap[j.mood]).reverse(),
        borderColor: "#6a1b9a",
        backgroundColor: "rgba(106, 27, 154, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Mood Trends Over Time" },
    },
    scales: {
      y: { min: 0, max: 5, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="app-title">Mood Insights</h1>
      </div>
      <p className="mindspace-content">
        <b>Mindspace</b> is your personal companion for emotional well-being.
        Here, you can reflect on your past moods and gain a deeper understanding
        of how your emotions change over time. With every journal entry, you’re
        building a clearer picture of your inner world. Mindspace helps you
        connect the dots, recognize patterns, and embrace your journey — one day
        at a time. Your emotions tell a story. Mindspace transforms your
        reflections into insights, empowering you to track progress, celebrate
        wins, and nurture resilience through life’s ups and downs. Whether
        you’re seeking clarity, balance, or growth, Mindspace provides a safe
        space to pause, breathe, and realign with what matters most — your
        well-being...!!!✨
      </p>
              <div className="profile-section">
                <FaUserCircle
                  size={40}
                  className="profile-icon-p"
                  onClick={() => setShowProfile(!showProfile)}
                />
                {showProfile && user && (
                  <div className={`profile-dropdown ${showProfile ? "active" : ""}`}>
                      <button
                          className="profile-close-btn"
                          onClick={() => setShowProfile(false)}
                          aria-label="Close profile"
                      >
                          ×
                      </button>
                    
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <button onClick={() => navigate("/dashboard")} className="dropdown-btn logout">Back to Dashboard </button>
                    <button onClick={handleLogout} className="dropdown-btn logout">Logout</button>
                  </div>
                  
                )}
              </div>
      {user && (
        <div className="mood-section">
          <h2>User Information</h2>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
        </div>
      )}

      {/* Filter Section */}
      <div className="mood-section">
        <label htmlFor="filter">Filter by:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Graph Section */}
      <div className="journal-section">
        <div className="graph-container">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="graph-info">
          This graph translates your daily reflections into mood scores, helping
          you visualize patterns. Regular journaling allows Mindspace to give
          you meaningful insights into your mental wellness journey.
        </p>
      </div>

      {/* Back Button */}
      <div className="journal-section button">
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FullGraph;
