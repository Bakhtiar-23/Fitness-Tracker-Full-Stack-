import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/AccountPage.css";

// Simulate fetching user data
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Bakhtiar Ismail',
        avatarUrl: 'https://avatarfiles.alphacoders.com/376/376314.png', // Use a placeholder avatar URL here
      });
    }, 1000); // Simulate a delay for fetching data
  });
};

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});
  const [notes, setNotes] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [focusedDay, setFocusedDay] = useState('2024-11-01'); // Default focus on the first day of the month
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const handleWorkoutChange = (date, workoutName) => {
    setSelectedWorkouts({
      ...selectedWorkouts,
      [date]: workoutName,
    });
  };

  const handleNoteChange = (date, note) => {
    setNotes({
      ...notes,
      [date]: note,
    });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const handleSignInClick = () => {
    navigate('/get-started/sign-in');
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...fileUrls]);
  };

  const generateCalendarRows = () => {
    const rows = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // Current month (0-indexed)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the current month
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const isToday = date === today.toISOString().split('T')[0];
  
      rows.push(
        <tr
          key={date}
          className={`${date === focusedDay ? 'focused-day' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => setFocusedDay(date)}
        >
          <td>{date}</td>
          <td>
            <select
              value={selectedWorkouts[date] || ''}
              onChange={(e) => handleWorkoutChange(date, e.target.value)}
            >
              <option value="">Select Workout</option>
              <option value="Chest">Chest</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Back">Back</option>
              <option value="Arms">Arms</option>
              <option value="Legs">Legs</option>
              <option value="Six-packs">Six-packs</option>
              <option value="Cardio">Cardio</option>
            </select>
          </td>
          <td>
            <input
              type="text"
              placeholder="Add note..."
              value={notes[date] || ''}
              onChange={(e) => handleNoteChange(date, e.target.value)}
            />
          </td>
        </tr>
      );
    }
    return rows;
  };
  

  const generateWeeklyPlan = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date(focusedDay);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() - weekStart.getDay() + i);
      return day.toISOString().split('T')[0];
    });
  
    return (
      <div>
        <div className="weekly-plan">
          {weekDays.map((date) => (
            <div
              key={date}
              className={`weekly-day ${date === focusedDay ? 'focused' : ''} ${date === today ? 'today' : ''}`}
              onClick={() => setFocusedDay(date)}
            >
              {date}
            </div>
          ))}
        </div>
        <div className="current-day-box">
          <h3>Current Day</h3>
          <div className={`current-day-display ${today === focusedDay ? 'focused' : ''}`}>
            <p>{today}</p>
            <p>Workout: {selectedWorkouts[today] || 'None selected'}</p>
            <p>Notes: {notes[today] || 'No notes'}</p>
          </div>
        </div>
      </div>
    );
  };
  

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h1>You are logged out</h1>
        <p>Please sign in again.</p>
        <button type="submit" onClick={handleSignInClick}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h1>Welcome to Your Account</h1>
      <div className="user-profile">
        <img src={user.avatarUrl} alt="User Avatar" className="user-avatar" />
        <h2>{user.name}</h2>
      </div>

      <h2>Weekly Plan</h2>
      <div className="weekly-plan">{generateWeeklyPlan()}</div>

      <h2>Workout Calendar</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Workout</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>{generateCalendarRows()}</tbody>
      </table>

      <h2>Photo Gallery</h2>
      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
      <div className="photo-gallery">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Uploaded ${index}`} className="uploaded-photo" />
          ))
        ) : (
          <p>No photos uploaded yet.</p>
        )}
      </div>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AccountPage;
