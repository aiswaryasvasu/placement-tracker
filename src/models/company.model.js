const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    jobDescription: String,
    ctc: { type: String, required: true },
    eligibilityCriteria: {
        minCgpa: { type: Number, default: 0 },
        maxBacklogs: { type: Number, default: 0 }
    },
    deadline: { type: Date, required: true }
});

// Defining the CompanySchema variable here
const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true },
    website: String,
    industry: String,
    hrContact: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: String
    },
    jobPostings: [JobPostingSchema]
}, { timestamps: true });

// Exporting it using the exact matching variable name
module.exports = mongoose.model('Company', CompanySchema);