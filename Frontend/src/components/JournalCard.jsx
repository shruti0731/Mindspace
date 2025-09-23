import React, { useState } from "react";
import "../styles/Dashboard.css";

const JournalCard = ({ journal, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(journal.content);
  const [editMood, setEditMood] = useState(journal.mood);

  const handleSave = () => {
    onUpdate(journal.id, { ...journal, content: editContent, mood: editMood });
    setIsEditing(false);
  };

  return (
    <div className="journal-card">
      <div className="journal-header">
        <span className="journal-date">{journal.date}</span>
        {!isEditing ? (
          <span>{journal.mood}</span>
        ) : (
          <select value={editMood} onChange={(e) => setEditMood(e.target.value)}>
            <option value="😊">Happy</option>
            <option value="😔">Sad</option>
            <option value="😡">Angry</option>
            <option value="😴">Tired</option>
            <option value="😐">Neutral</option>
          </select>
        )}
      </div>

 
      {!isEditing ? (
        <p>{journal.content}</p>
      ) : (
        
        <textarea className="journal-section-textarea-prev" 
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
      )}

      <div >
        {!isEditing ? (
          <>
            <div className="journal-actions-button">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(journal.id)}>Delete</button>
            </div>
          </>
        ) : (
          <>
            <div className="journal-actions-button">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button></div>
          </>
        )}
      </div>
    </div>
  );
};

export default JournalCard;
