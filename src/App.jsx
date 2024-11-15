import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import ProgressStats from './components/ProgressStats/ProgressStats';
import TeamMembers from './components/TeamMembers/TeamMembers';
import Settings from './components/Settings/Settings';
import Header from './components/Header';
import HomePage from './components/HomePage'; // Import HomePage
import Footer from './components/Footer';
import Workouts from './components/Workouts/Workouts'; // Import Workouts
import MealPlanner from './components/MealPlanner/MealPlanner'; // Import MealPlanner
import WeeklyWorkoutPlan from './components/WeeklyWorkoutPlan/WeeklyWorkoutPlan'; // Import WeeklyWorkoutPlan
import Notifications from './components/Notifications/Notifications'; // Import Notifications
import ExerciseDetails from "./components/ExerciseDetail/ExerciseDetail";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import SignInForm from './components/SignInForm/SignInForm';
import AccountPage from './components/AccountPage/AccountPage';
import SignOut from './components/SignOut/SignOut';
import GetStartedPage from './components/GetStartedPage/GetStartedPage';
import TrackYourWorkouts from './components/TrackYourWorkouts/TrackYourWorkouts';
import ProtectedPage from './components/ProtectedPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header component (Navigation links) */}
        <Header />

        {/* Main content area where routes will be rendered */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage is the default route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/progress-stats" element={<ProgressStats />} />
          <Route path="/team-members" element={<TeamMembers />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* New Routes for additional pages */}
          <Route path="/workouts" element={<Workouts />} /> {/* View Workouts */}
          <Route path="/meal-planner" element={<MealPlanner />} /> {/* Meal Planner */}
          <Route path="/weekly-workout-plan" element={<WeeklyWorkoutPlan />} /> {/* Weekly Workout Plan */}
          <Route path="/notifications" element={<Notifications />} /> {/* Notifications */}
          <Route path="/exercise-details/:exerciseName" element={<ExerciseDetails />} />

          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/get-started/registration" element={<RegistrationForm />} />
          <Route path="/get-started/sign-in" element={<SignInForm />} />
          <Route path="/get-started/account" element={<AccountPage />} />
          <Route path="/get-started/sign-out" element={<SignOut />} />

          <Route path="/track-your-workouts" element={<TrackYourWorkouts />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
