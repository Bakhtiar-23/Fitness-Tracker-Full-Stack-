import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // Add other fields like course duration, price, etc.
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
