const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/user.model');
const Company = require('./models/company.model');
const Application = require('./models/application.model');

const seedDatabase = async () => {
    try {
        // Connect to our local database
        await connectDB();

        // Clear existing data so we start fresh every time we run this script
        await User.deleteMany();
        await Company.deleteMany();
        await Application.deleteMany();
        console.log('🧹 Old data cleared...');

        // 1. Create a Sample Company with a Job Profile
        const sampleCompany = await Company.create({
            companyName: 'TechCorp Solutions',
            website: 'https://techcorp.example.com',
            industry: 'Software Engineering',
            hrContact: {
                name: 'Jane Doe',
                email: 'hr@techcorp.example.com',
                phone: '9876543210'
            },
            jobPostings: [{
                roleName: 'Associate Software Engineer',
                jobDescription: 'Looking for enthusiastic engineering freshers.',
                ctc: '8 LPA',
                eligibilityCriteria: { minCgpa: 7.0, maxBacklogs: 0 },
                deadline: new Date('2026-07-15')
            }]
        });
        console.log('🏢 Mock Company & Job created!');

        // 2. Create an Admin Account
        await User.create({
            name: 'Placement Officer Admin',
            email: 'admin@college.edu',
            password: 'adminpassword123', // Raw text for now, should be hashed later!
            role: 'admin'
        });

        // 3. Create a Recruiter Account (Linked to TechCorp)
        await User.create({
            name: 'Jane Doe',
            email: 'hr@techcorp.example.com',
            password: 'recruiterpassword123',
            role: 'recruiter',
            companyId: sampleCompany._id
        });

        // 4. Create a Student Account
        const sampleStudent = await User.create({
            name: 'Alex Kumar',
            email: 'alex.mec@gmail.com',
            password: 'studentpassword123',
            role: 'student',
            studentProfile: {
                rollNumber: 'MEC22CS01',
                branch: 'Computer Science',
                cgpa: 8.5,
                backlogs: 0,
                resumeUrl: 'https://drive.google.com/mock-resume-url'
            }
        });
        console.log('👥 Mock Users (Admin, Recruiter, Student) created!');

        // 5. Create a Mock Application (Student applying to TechCorp's Job)
        await Application.create({
            studentId: sampleStudent._id,
            companyId: sampleCompany._id,
            jobRoleId: sampleCompany.jobPostings[0]._id,
            status: 'Applied'
        });
        console.log('📝 Mock Application linked successfully!');

        console.log('🎉 Database seeding complete!');
        process.exit(0); // Exit smoothly
    } catch (error) {
        console.error(`❌ Seeding error: ${error.message}`);
        process.exit(1);
    }
};

seedDatabase();