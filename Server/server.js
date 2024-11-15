import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Create the express app instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Log MONGO_URI to verify it's loaded
console.log('Mongo URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define User schema with password hashing functionality
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Define Course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Course = mongoose.model('Course', courseSchema);

// Define Subscription schema
const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Course Subscription route
app.post('/subscribe', async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ error: 'User ID and Course ID are required' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ error: 'Course not found' });
    }

    const existingSubscription = await Subscription.findOne({ user: userId, course: courseId });
    if (existingSubscription) {
      return res.status(400).json({ error: 'User already subscribed to this course' });
    }

    const subscription = new Subscription({ user: userId, course: courseId });
    await subscription.save();

    res.status(201).json({ message: 'User successfully subscribed to the course' });
  } catch (err) {
    console.error('Error subscribing user to course:', err);
    res.status(500).json({ error: 'Error subscribing user to course' });
  }
});

// Default route for undefined paths
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
