const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student', 'admin', 'recruiter'], 
        required: true 
    },
    // Student-specific fields (Only populated if role === 'student')
    studentProfile: {
        rollNumber: String,
        branch: String,
        cgpa: Number,
        backlogs: { type: Number, default: 0 },
        resumeUrl: String
    },
    // Recruiter-specific field linking them to their firm
    companyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company' 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('User', UserSchema);