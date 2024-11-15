import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/ExerciseDetail.css';

const exerciseData = {
  'chest-exercises': {
    name: 'Chest Exercises',
    details: [
      { exercise: 'Push-Ups', imageUrl: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/10/push-up-tall-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4', sets: 3, reps: 12, rest: '60s' },
      { exercise: 'Chest Press', imageUrl: 'https://anabolicaliens.com/cdn/shop/articles/609995c21621817d63a168d1_feel-the-bench-in-your-chest-with-this-move-1-700xh_700x.jpg?v=1641735464', sets: 4, reps: 10, rest: '90s' },
      { exercise: 'Incline Dumbbell Press', imageUrl: 'https://swolverine.com/cdn/shop/articles/Incline_Dumbbell_Bench_Press_1200x.jpg?v=1645633411', sets: 3, reps: 12, rest: '60s' },
      { exercise: 'Decline Push-Ups', imageUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2023/04/incline-vs-decline-push-ups.jpg', sets: 3, reps: 12, rest: '60s' },
      { exercise: 'Flat Bench Press', imageUrl: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Bench-Press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4', sets: 4, reps: 10, rest: '90s' },
      { exercise: 'Chest Dips', imageUrl: 'https://weighttrainingexercises4you.com/wp-content/uploads/Chest-Dips.jpg', sets: 3, reps: 8, rest: '90s' },
      { exercise: 'Cable Chest Fly', imageUrl: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/cable-chest-fly.gif?resize=600%2C600&ssl=1', sets: 4, reps: 12, rest: '60s' },
      { exercise: 'Chest Press Machine', imageUrl: 'https://images.ctfassets.net/sby3b3ghdq6f/7oVqekzVlnAjPLWOJbBTMR/9a3b5c09104551f03b8e41f505b26614/Seated_Chest_Press_Machine.webp?w=900&fm=webp', sets: 3, reps: 12, rest: '60s' },
      { exercise: 'Dumbbell Pullover', imageUrl: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2022/05/Double-dumbbell-pullover.png?ezimgfmt=ng%3Awebp%2Fngcb4', sets: 3, reps: 12, rest: '60s' },
    ],
  },
};

const ExerciseDetails = () => {
    const { exerciseName } = useParams();
    const navigate = useNavigate();
    const exercise = exerciseData[exerciseName];
  
    if (!exercise) {
      return <h2>Exercise details not found</h2>;
    }
  
    const handleSelectExercise = (selectedExercise) => {
      // Navigate to TrackYourWorkouts and pass selected exercise details
      navigate('/track-your-workouts', {
        state: {
          selectedExercise: selectedExercise.exercise,
          exerciseDetails: selectedExercise,
        },
      });
    };
  
    return (
      <div>
        <h1>{exercise.name}</h1>
        {exercise.details.map((item, index) => (
          <div key={index} className="exercise-detail-card">
            <h3>{item.exercise}</h3>
            <img src={item.imageUrl} alt={item.exercise} width="560" height="315" />
            <p>Sets: {item.sets}</p>
            <p>Reps: {item.reps}</p>
            <p>Rest: {item.rest}</p>
            <button onClick={() => handleSelectExercise(item)}>
              Add {item.exercise} to Workout
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ExerciseDetails;