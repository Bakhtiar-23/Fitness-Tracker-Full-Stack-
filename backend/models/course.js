const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  price: {
    type: Number,
    required: [true, "Price is required"], // Ensure the price is provided
    min: [10, "Price must be at least $10"], // Set a minimum value for price
    max: [9999, "Price cannot exceed $9999"], // Set a maximum value for price
    validate: {
      validator: function(value) {
        return value > 0; // Ensure the price is a positive number
      },
      message: "Price must be a positive number" // Error message if the price is not positive
    }
  }
});

module.exports = mongoose.model("Course", courseSchema);
