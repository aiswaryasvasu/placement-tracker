import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Force dotenv to load right away
dotenv.config();

// Explicitly pass the API key from your .env file into the client setup
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); 

export const checkEligibilityWithAI = async (studentProfile, companyRequirements) => {
  const prompt = `
    You are an expert college placement coordinator. 
    Analyze the following student profile against the company requirements and determine if the student is eligible.
    
    Company Requirements:
    - Name: ${companyRequirements.name}
    - Minimum CGPA: ${companyRequirements.minCGPA}
    - Allowed Branches: ${companyRequirements.allowedBranches.join(', ')}
    
    Student Profile:
    - Name: ${studentProfile.name}
    - CGPA: ${studentProfile.cgpa}
    - Branch: ${studentProfile.branch}
    - Active Backlogs: ${studentProfile.backlogs}
    
    Respond STRICTLY in the following JSON format. Do not include markdown code block formatting (like \`\`\`json).
    {
      "eligible": true or false,
      "reason": "A clear, 1-2 sentence explanation of why they are or are not eligible."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const result = JSON.parse(response.text.trim());
    return result;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return {
      eligible: false,
      reason: "Failed to process evaluation due to an AI service interruption."
    };
  }
};