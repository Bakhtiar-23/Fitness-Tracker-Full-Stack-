const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    experience: {
        type: String,  // You can adjust the type as needed (e.g., Number, String)
        required: true
    },
    image: {
        type: String
    }
    // Add any other fields you need
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
