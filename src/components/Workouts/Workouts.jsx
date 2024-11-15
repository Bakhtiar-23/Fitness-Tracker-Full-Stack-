import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Workouts.css";

const Workouts = () => {
  const workoutSamples = {
    Beginner: {
      Chest: { name: "Chest Exercises", videoUrl: "https://www.youtube.com/embed/_l3ySVKYVJ8" },
      Shoulders: { name: "Shoulder Exercises", videoUrl:"https://www.youtube.com/embed/grVuN0kr8Co" },
      Back: { name: "Back Exercises", videoUrl: "https://www.youtube.com/embed/FpU7z8cs5V0" },
      Legs: { name: "Legs Exercises", videoUrl: "https://www.youtube.com/embed/sPZJlNN6EoQ" }, // Beginner Legs Video
      Arms: { name: "Arms (Biceps & Triceps)" },
      ABS: { name: "Six-Pack ABS" },
      Cardio: { name: "Cardio" },
    },
    Intermediate: {
      Chest: { name: "Chest Exercises", videoUrl: "https://www.youtube.com/embed/5k_enq6vXGM" },
      Shoulders: { name: "Shoulder Exercises", videoUrl: "https://www.youtube.com/embed/4SBAHJOKhCM" },
      Back: { name: "Back Exercises", videoUrl: "https://www.youtube.com/embed/bTSlpq_0os0" },
      Legs: { name: "Legs Exercises", videoUrl: "https://www.youtube.com/embed/SQvuZNovE4Y" }, // Intermediate Legs Video
      Arms: { name: "Arms (Biceps & Triceps)" },
      ABS: { name: "Six-Pack ABS" },
      Cardio: { name: "Cardio" },
    },
    Advanced: {
      Chest: { name: "Chest Exercises", videoUrl: "https://www.youtube.com/embed/0cXAp6WhSj4" },
      Shoulders: { name: "Shoulder Exercises", videoUrl:"https://www.youtube.com/embed/8z49mvk-HI0" },
      Back: { name: "Back Exercises", videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g" },
      Legs: { name: "Legs Exercises", videoUrl: "https://www.youtube.com/embed/BNKLoCtXO2E" }, // Advanced Legs Video
      Arms: { name: "Arms (Biceps & Triceps)" },
      ABS: { name: "Six-Pack ABS" },
      Cardio: { name: "Cardio" },
    },
  };

  

  return (
    <main>
      {Object.keys(workoutSamples).map((level, idx) => (
        <section key={idx} className="workout-level">
          <h2>{level} Level Exercises</h2>
          <div className="horizontal-container">
            {Object.keys(workoutSamples[level]).map((bodyPart, id) => (
              <div key={id} className="exercise-sample-card">
                <h4>{workoutSamples[level][bodyPart].name}</h4>
                {workoutSamples[level][bodyPart].videoUrl && (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="150"
                      src={workoutSamples[level][bodyPart].videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={workoutSamples[level][bodyPart].name}
                    />
                  </div>
                )}
                <Link
                  to={`/exercise-details/${workoutSamples[level][bodyPart].name.replace(/\s+/g, "-").toLowerCase()}`}
                  className="details-link"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Workouts;
