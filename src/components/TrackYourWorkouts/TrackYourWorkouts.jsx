import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../styles/TrackYourWorkouts.css";

const TrackYourWorkouts = () => {
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    // Retrieve workout logs from localStorage (if they exist)
    const savedLogs = localStorage.getItem('workoutLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [selectedLogs, setSelectedLogs] = useState([]); // For tracking selected workouts to remove

  const location = useLocation();
  const { selectedExercise, exerciseDetails } = location.state || {};

  const [level, setLevel] = useState('Beginner'); // Default to Beginner
  const [selectedExerciseType, setSelectedExerciseType] = useState(''); // Default to empty exercise type

  // Effect to handle adding a new workout log
  useEffect(() => {
    if (selectedExercise && exerciseDetails) {
      const newLog = {
        workoutCategory: exerciseDetails.exercise,
        exercise: exerciseDetails.exercise,
        sets: exerciseDetails.sets,
        reps: exerciseDetails.reps,
        rest: exerciseDetails.rest,
        date: new Date().toLocaleDateString(),
      };

      // Prevent adding duplicate exercises before updating the state
      const isDuplicate = workoutLogs.some(
        (log) => log.exercise === newLog.exercise && log.date === newLog.date
      );

      if (!isDuplicate) {
        // Append new log to existing logs
        const updatedLogs = [...workoutLogs, newLog];

        // Save updated logs to localStorage to persist across page reloads
        localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));

        // Update state with new log
        setWorkoutLogs(updatedLogs);
      }
    }
  }, [selectedExercise, exerciseDetails, workoutLogs]);

  // Handle checkbox selection for workout logs
  const handleCheckboxChange = (logIndex) => {
    setSelectedLogs((prevSelected) => {
      if (prevSelected.includes(logIndex)) {
        return prevSelected.filter((index) => index !== logIndex); // Remove from selected
      } else {
        return [...prevSelected, logIndex]; // Add to selected
      }
    });
  };

  // Handle removal of selected logs
  const handleRemoveSelected = () => {
    if (selectedLogs.length === 0) {
      alert("No logs selected for removal!");
      return;
    }

    // Remove the selected workout logs from the array
    const remainingLogs = workoutLogs.filter((_, index) => !selectedLogs.includes(index));

    // Update state and localStorage with the remaining logs
    setWorkoutLogs(remainingLogs);
    localStorage.setItem('workoutLogs', JSON.stringify(remainingLogs));

    // Reset selectedLogs after removal
    setSelectedLogs([]); // Clear selection after removing

    // If no logs remain, clear localStorage entirely
    if (remainingLogs.length === 0) {
      localStorage.removeItem('workoutLogs');
    }
  };

  // Ensure that selected logs are valid after removing workouts
  useEffect(() => {
    // Check if selectedLogs contains an index that no longer exists due to removal
    const validSelectedLogs = selectedLogs.filter(index => index < workoutLogs.length);
    setSelectedLogs(validSelectedLogs); // Update selected logs to avoid invalid indexes
  }, [workoutLogs, selectedLogs]);

  // Handle level change
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  // Handle exercise type change
  const handleExerciseChange = (e) => {
    setSelectedExerciseType(e.target.value);
  };

  return (
    <div>
      <h1>Track Your Workouts</h1>
      <p>Select exercises and track your progress:</p>
      <Link to="/workouts">
        <button>Add Another Workout</button>
      </Link>

      <div>
        {/* Level and Exercise Type Selection */}
        <h3>Choose Workout Level and Exercise Type</h3>

        <div>
          <label htmlFor="level">Choose your level:</label>
          <select id="level" value={level} onChange={handleLevelChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <p>Level: {level}</p>
        </div>

        <div>
          <label htmlFor="exercise">Choose your exercise:</label>
          <select id="exercise" value={selectedExerciseType} onChange={handleExerciseChange}>
            <option value="">Select an exercise</option>
            <option value="Chest">Chest</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Back">Back</option>
            <option value="Arms">Arms</option>
            <option value="Legs">Legs</option>
            <option value="Six-packs">Six-packs</option>
            <option value="Cardio">Cardio</option>
          </select>
          <p>Exercise Type: {selectedExerciseType}</p>
        </div>
      </div>

      <div>
        <h2>Workout Log</h2>
        {workoutLogs.length > 0 ? (
          <>
            <ul>
              {workoutLogs.map((log, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={selectedLogs.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <strong>{log.workoutCategory}</strong> - {log.exercise} - Sets: {log.sets}, Reps: {log.reps}, Rest: {log.rest} ({log.date})
                </li>
              ))}
            </ul>

            <button onClick={handleRemoveSelected} disabled={selectedLogs.length === 0}>
              Remove Selected Workouts
            </button>
          </>
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default TrackYourWorkouts;
