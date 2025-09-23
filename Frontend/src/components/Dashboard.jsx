
// import React, { useState, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import "../styles/Dashboard.css";
// import { useNavigate } from "react-router-dom";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import JournalCard from "./JournalCard"; // ✅ NEW COMPONENT

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const [journal, setJournal] = useState("");
//   const [search, setSearch] = useState("");
//   const [journals, setJournals] = useState([]);
//   const [filteredJournals, setFilteredJournals] = useState([]);
//   const [mood, setMood] = useState("😊");
//   const [filterMood, setFilterMood] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [recommendations, setRecommendations] = useState([]);

//   const navigate = useNavigate();

//   // Fetch user and journals
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await fetch("http://localhost:8081/api/users/me", {
//           credentials: "include",
//         });
//         if (!userRes.ok) throw new Error("Failed to fetch user");

//         const userData = await userRes.json();
//         setUser(userData);
//         setUserId(userData.id);

//         const res = await fetch(`http://localhost:8081/api/journals/${userData.id}`);
//         if (!res.ok) throw new Error("Failed to fetch journals");
//         const data = await res.json();
//         setJournals(data);
//         setFilteredJournals(data);

//         const recRes = await fetch(`http://localhost:8081/api/recommendations/${userData.id}`);
//         if (recRes.ok) {
//           const recData = await recRes.json();
//           setRecommendations(recData);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Save new journal
//   const handleAddJournal = async () => {
//     if (journal.trim() === "" || !userId) return;

//     const today = new Date().toISOString().split("T")[0];
//     const newEntry = { date: today, content: journal, mood };

//     try {
//       const res = await fetch(`http://localhost:8081/api/journals/${userId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newEntry),
//       });

//       if (!res.ok) throw new Error("Failed to save journal");

//       const savedJournal = await res.json();
//       setJournals([savedJournal, ...journals]);
//       setFilteredJournals([savedJournal, ...filteredJournals]);
//       setJournal("");

//       const recRes = await fetch(
//         `http://localhost:8081/api/recommendations/${userId}?mood=${savedJournal.mood}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(savedJournal.content),
//         }
//       );
//       if (recRes.ok) {
//         const recs = await recRes.json();
//         setRecommendations(recs);
//       }
//     } catch (err) {
//       console.error("Error saving journal:", err);
//     }
//   };

//   // 🔹 Delete a journal
//   const handleDeleteJournal = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:8081/api/journals/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete journal");
//       setJournals((prev) => prev.filter((j) => j.id !== id));
//       setFilteredJournals((prev) => prev.filter((j) => j.id !== id));
//     } catch (err) {
//       console.error("Error deleting journal:", err);
//     }
//   };

//   // 🔹 Update a journal
//   const handleUpdateJournal = async (id, updated) => {
//     try {
//       const res = await fetch(`http://localhost:8081/api/journals/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updated),
//       });
//       if (!res.ok) throw new Error("Failed to update journal");
//       const saved = await res.json();
//       setJournals((prev) => prev.map((j) => (j.id === id ? saved : j)));
//       setFilteredJournals((prev) => prev.map((j) => (j.id === id ? saved : j)));
//     } catch (err) {
//       console.error("Error updating journal:", err);
//     }
//   };

//   // 🔎 Filters
//   const applyFilters = () => {
//     let temp = [...journals];
//     if (search.trim()) {
//       temp = temp.filter((j) =>
//         j.content.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (filterMood) {
//       temp = temp.filter((j) => j.mood === filterMood);
//     }
//     if (startDate && endDate) {
//       temp = temp.filter((j) => j.date >= startDate && j.date <= endDate);
//     }
//     setFilteredJournals(temp);
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setFilterMood("");
//     setStartDate("");
//     setEndDate("");
//     setFilteredJournals(journals);
//   };

//   const handleLogout = () => navigate("/");
//   const handleFullGraph = () => navigate("/full-graph", { state: { user, journals } });

//   // Mood graph data
//   const moodMap = { "😊": 5, "😐": 3, "😔": 2, "😡": 1, "😴": 0 };
//   const chartData = {
//     labels: journals.map((j) => j.date).reverse(),
//     datasets: [
//       {
//         label: "Mood Tracking",
//         data: journals.map((j) => moodMap[j.mood]).reverse(),
//         borderColor: "#6a1b9a",
//         backgroundColor: "rgba(106,27,154,0.2)",
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h1 className="app-title">MindSpace</h1>
//         <div className="profile-section">
//           <FaUserCircle
//             size={40}
//             className="profile-icon"
//             onClick={() => setShowProfile(!showProfile)}
//           />
//           {showProfile && user && (
//             <div className={`profile-dropdown ${showProfile ? "active" : ""}`}>
//               <h2>User Information</h2>
//               <p><b>Name:</b> {user.name}</p>
//               <p><b>Email:</b> {user.email}</p>

//               <h3>Mood Tracking</h3>
//               <div className="chart-container">
//                 <Line data={chartData} />
//               </div>
//               <button onClick={handleFullGraph} className="dropdown-btn">Show Full Graph</button>
//               <button onClick={handleLogout} className="dropdown-btn logout">Logout</button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filter-section">
//         <h3>Search & Filters</h3>
//         <input
//           type="text"
//           placeholder="Search journals..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
//           <option value="">Filter by Mood</option>
//           <option value="😊">Happy</option>
//           <option value="😔">Sad</option>
//           <option value="😡">Angry</option>
//           <option value="😴">Tired</option>
//           <option value="😐">Neutral</option>
//         </select>
//         <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         <button onClick={applyFilters}>Apply</button>
//         <button onClick={clearFilters}>Clear</button>
//       </div>

//       {/* Mood Selector */}
//       <div className="mood-section">
//         <label>Today's Mood:</label>
//         <select value={mood} onChange={(e) => setMood(e.target.value)}>
//           <option value="😊">Happy</option>
//           <option value="😔">Sad</option>
//           <option value="😡">Angry</option>
//           <option value="😴">Tired</option>
//           <option value="😐">Neutral</option>
//         </select>
//       </div>

//       {/* Add Journal */}
//       <div className="journal-section">
//         <label>Add Your Journal:</label>
//         <textarea
//           value={journal}
//           onChange={(e) => setJournal(e.target.value)}
//           placeholder="Write about your day..."
//         />
//         <button onClick={handleAddJournal}>Save Journal</button>
//       </div>

//       {/* Previous Journals */}
//       <div className="previous-journals">
//         <h2>Previous Journals</h2>
//         {filteredJournals.length === 0 ? (
//           <p>No journals found.</p>
//         ) : (
//           filteredJournals
//             .slice()
//             .reverse()
//             .map((j) => (
//               <JournalCard
//                 key={j.id}
//                 journal={j}
//                 onDelete={handleDeleteJournal}
//                 onUpdate={handleUpdateJournal}
//               />
//             ))
//         )}
//       </div>

//       {/* Recommendations */}
//       <div className="recommendations-section">
//         <h2>Recommended for You</h2>
//         {recommendations.length === 0 ? (
//           <p>No recommendations yet.</p>
//         ) : (
//           <ul>
//             {recommendations.map((r, idx) => (
//               <li key={idx}>
//                 <b>{r.category}:</b>{" "}
//                 <a href={r.url} target="_blank" rel="noreferrer">
//                   {r.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
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
import JournalCard from "./JournalCard"; // ✅ Reusable Journal Card

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [journal, setJournal] = useState("");
  const [search, setSearch] = useState("");
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [mood, setMood] = useState("😊");
  const [filterMood, setFilterMood] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();

  // Fetch user and journals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:8081/api/users/me", {
          credentials: "include",
        });
        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData = await userRes.json();
        setUser(userData);
        setUserId(userData.id);

        const res = await fetch(`http://localhost:8081/api/journals/${userData.id}`);
        if (!res.ok) throw new Error("Failed to fetch journals");
        const data = await res.json();
        setJournals(data);
        setFilteredJournals(data);

        const recRes = await fetch(`http://localhost:8081/api/recommendations/${userData.id}`);
        if (recRes.ok) {
          const recData = await recRes.json();
          setRecommendations(recData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Save new journal
  const handleAddJournal = async () => {
    if (journal.trim() === "" || !userId) return;

    const today = new Date().toISOString().split("T")[0];
    const newEntry = { date: today, content: journal, mood };

    try {
      const res = await fetch(`http://localhost:8081/api/journals/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) throw new Error("Failed to save journal");

      const savedJournal = await res.json();
      setJournals([savedJournal, ...journals]);
      setFilteredJournals([savedJournal, ...filteredJournals]);
      setJournal("");

      const recRes = await fetch(
        `http://localhost:8081/api/recommendations/${userId}?mood=${savedJournal.mood}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedJournal.content),
        }
      );
      if (recRes.ok) {
        const recs = await recRes.json();
        setRecommendations(recs);
      }
    } catch (err) {
      console.error("Error saving journal:", err);
    }
  };

  // Delete journal
  const handleDeleteJournal = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/journals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete journal");
      setJournals((prev) => prev.filter((j) => j.id !== id));
      setFilteredJournals((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Error deleting journal:", err);
    }
  };

  // Update journal
  const handleUpdateJournal = async (id, updated) => {
    try {
      const res = await fetch(`http://localhost:8081/api/journals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update journal");
      const saved = await res.json();
      setJournals((prev) => prev.map((j) => (j.id === id ? saved : j)));
      setFilteredJournals((prev) => prev.map((j) => (j.id === id ? saved : j)));
    } catch (err) {
      console.error("Error updating journal:", err);
    }
  };

  // Filters
  const applyFilters = () => {
    let temp = [...journals];
    if (search.trim()) {
      temp = temp.filter((j) =>
        j.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterMood) {
      temp = temp.filter((j) => j.mood === filterMood);
    }
    if (startDate && endDate) {
      temp = temp.filter((j) => j.date >= startDate && j.date <= endDate);
    }
    setFilteredJournals(temp);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterMood("");
    setStartDate("");
    setEndDate("");
    setFilteredJournals(journals);
  };

  const handleLogout = () => navigate("/");
  const handleFullGraph = () => navigate("/full-graph", { state: { user, journals } });

  // Mood graph data
  const moodMap = { "😊": 5, "😐": 3, "😔": 2, "😡": 1, "😴": 0 };
  const chartData = {
    labels: journals.map((j) => j.date).reverse(),
    datasets: [
      {
        label: "Mood Tracking",
        data: journals.map((j) => moodMap[j.mood]).reverse(),
        borderColor: "#6a1b9a",
        backgroundColor: "rgba(106,27,154,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="app-title">MindSpace</h1>
        <div className="profile-section">
          <FaUserCircle
            size={40}
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && user && (
            <div className={`profile-dropdown ${showProfile ? "active" : ""}`}>
              <h2>User Information</h2>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>

              <h3>Mood Tracking</h3>
              <div className="chart-container">
                <Line data={chartData} />
              </div>
              <button onClick={handleFullGraph} className="dropdown-btn">Show Full Graph</button>
              <button onClick={handleLogout} className="dropdown-btn logout">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card filter-section">
        <h3>Search & Filters</h3>
        <input
          type="text"
          placeholder="Search journals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
          <option value="">Filter by Mood</option>
          <option value="😊">Happy</option>
          <option value="😔">Sad</option>
          <option value="😡">Angry</option>
          <option value="😴">Tired</option>
          <option value="😐">Neutral</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={applyFilters}>Apply</button>
        <button onClick={clearFilters}>Clear</button>
      </div>

      {/* Mood Selector */}
      <div className="card mood-section">
        <label>Today's Mood:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="😊">Happy</option>
          <option value="😔">Sad</option>
          <option value="😡">Angry</option>
          <option value="😴">Tired</option>
          <option value="😐">Neutral</option>
        </select>
      </div>

      {/* Add Journal */}
      <div className="card journal-section">
        <label>Add Your Journal:</label>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Write about your day..."
        />
        <button onClick={handleAddJournal}>Save Journal</button>
      </div>

      {/* Previous Journals */}
      <div className="card previous-journals">
        <h2>Previous Journals</h2>
        {filteredJournals.length === 0 ? (
          <p>No journals found.</p>
        ) : (
          filteredJournals
            .slice()
            .reverse()
            .map((j) => (
              <JournalCard
                key={j.id}
                journal={j}
                onDelete={handleDeleteJournal}
                onUpdate={handleUpdateJournal}
              />
            ))
        )}
      </div>

      {/* Recommendations */}
      <div className="card recommendations-section">
        <h2>Recommended for You</h2>
        {recommendations.length === 0 ? (
          <p>No recommendations yet.</p>
        ) : (
          <ul>
            {recommendations.map((r, idx) => (
              <li key={idx}>
                <b>{r.category}:</b>{" "}
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;