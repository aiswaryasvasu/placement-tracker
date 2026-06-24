const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    companyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    jobRoleId: { 
        type: mongoose.Schema.Types.ObjectId, // Connects to the specific job inside the company's jobPostings array
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Applied', 'Shortlisted', 'Technical Test', 'Interview', 'Placed', 'Rejected'], 
        default: 'Applied' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);