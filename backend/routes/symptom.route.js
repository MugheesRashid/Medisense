const express = require("express");
const router = express();
const { diagnosePrompt, analysePrompt } = require("./prompts.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define your model hierarchy: Pro -> Flash -> Flash-Lite
const MODEL_FALLBACK_LIST = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash-lite-preview",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite"
];

/**
 * Reusable helper to generate content with fallback logic
 */
async function generateWithFallback(prompt) {
  let lastError = null;

  for (const modelName of MODEL_FALLBACK_LIST) {
    try {
      console.log(`Attempting generation with: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      
      const response = await result.response;
      const text = response.text();

      if (!text) throw new Error("Empty response from model");
      
      return text; // Success! Exit the loop and return the result
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error.message);
      lastError = error;
      // Loop continues to next model in MODEL_FALLBACK_LIST
    }
  }

  // If we reach here, all models failed
  throw new Error(`All models failed. Last error: ${lastError?.message}`);
}

// --- Routes ---

router.post("/analyze", async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!Array.isArray(symptoms)) {
      return res.status(400).json({ error: "Invalid symptoms data" });
    }

    const prompt = analysePrompt + JSON.stringify(symptoms);
    
    // Using the fallback function
    const rawText = await generateWithFallback(prompt);

    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}") + 1;
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON returned");

    const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd));
    res.json(parsed);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze symptoms" });
  }
});

router.post("/diagnose", async (req, res) => {
  try {
    const { symptoms, followUpAnswers, medicalHistory } = req.body;

    if (!symptoms || !followUpAnswers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = diagnosePrompt + `
      Symptoms: ${JSON.stringify(symptoms)}
      Follow-up Answers: ${JSON.stringify(followUpAnswers)}
      Medical History: ${medicalHistory ? JSON.stringify(medicalHistory) : "Not provided"}
    `;

    // Using the fallback function
    const rawText = await generateWithFallback(prompt);

    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}") + 1;
    const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd));

    res.json(parsed);
  } catch (err) {
    console.error("Diagnosis error:", err);
    res.status(500).json({ error: err.message || "Diagnosis failed" });
  }
});

module.exports = router;