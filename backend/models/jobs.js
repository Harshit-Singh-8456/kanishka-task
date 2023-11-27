const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        dob: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"],
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true,
            max: 10
        },
        package: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
