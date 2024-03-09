const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    nameId: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of the uniqueId field
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    courses: {
        type: [String], // Assuming multiple courses can be associated with an employee
        default: []     // Empty array by default
    },
    image: {
        type: Buffer,   // Storing the image as a Buffer
        required: false // Image is not required
    }
}, {
    timestamps: true // Add timestamps for createdAt and updatedAt fields
});

// Create a model using the schema
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

module.exports = Employee;
