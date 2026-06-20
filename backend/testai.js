import { checkEligibilityWithAI } from './services/aiService.js';

// Fake student data to test with
const sampleStudent = {
  name: "Hari",
  cgpa: "7.2",
  branch: "Computer Science",
  backlogs: 0
};

// Fake company data to test against
const sampleCompany = {
  name: "Google India",
  minCGPA: "8.0",
  allowedBranches: ["Computer Science", "Information Technology"]
};

async function runTest() {
  console.log("Sending data to Gemini AI...");
  const result = await checkEligibilityWithAI(sampleStudent, sampleCompany);
  console.log("\n--- AI EVALUATION RESULT ---");
  console.log(JSON.stringify(result, null, 2));
}

runTest();