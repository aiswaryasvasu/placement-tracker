const express = require('express');
const router = express.Router();
const { GoogleGenAI, Type } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

router.post('/check', async (req, res) => {
    try {
        const { cgpa, backlogs, skills, companyRequiredCgpa } = req.body;

        const prompt = `Evaluate if a student is eligible for a company requiring a minimum CGPA of ${companyRequiredCgpa}. 
        The student has a CGPA of ${cgpa}, ${backlogs} backlogs, and the following skills: ${skills.join(', ')}.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                // Enforce a strict JSON structure back from the model
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: { type: Type.STRING, description: "Must be either 'Eligible' or 'Not Eligible'" },
                        summary: { type: Type.STRING, description: "A one-sentence breakdown of the outcome" },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "List of actionable technical or career next steps"
                        }
                    },
                    required: ["status", "summary", "recommendations"],
                }
            }
        });

        // The response text is guaranteed to be a valid JSON string matching the schema
        const structuredAnalysis = JSON.parse(response.text);

        res.status(200).json({ 
            success: true, 
            data: structuredAnalysis 
        });

    } catch (error) {
        console.error("AI Route Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to process eligibility check via AI." 
        });
    }
});

module.exports = router;