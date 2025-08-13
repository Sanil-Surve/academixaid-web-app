const axios = require("axios");
const Question = require("../models/Question");

async function getAnswer(question, model = "llama3.2:latest") {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model,
        prompt: `Give Answer of this question: ${question}`,
        stream: true,
      },
      {
        responseType: "stream",
      }
    );

    return await new Promise((resolve, reject) => {
      let answer = "";
      response.data.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        for (const line of lines) {
          if (line.trim() === "") continue;
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              answer += parsed.response;
            }
          } catch (err) {
            // ignore JSON parse errors for incomplete lines
          }
        }
      });

      response.data.on("end", () => {
        resolve(answer);
      });

      response.data.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error fetching answer from Ollama:", error.message);
    throw error;
  }
}

async function submitQuestion(req, res) {
  try {
    const { question } = req.body;
    const answer = await getAnswer(question);

    const newQuestion = new Question({
      question,
      answer,
    });
    await newQuestion.save();

    res.json({ answer });
  } catch (error) {
    console.error("Error processing question:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getAnswerFromDatabase = async (req, res) => {
  try {
    const { question } = req.body;
    const result = await Question.findOne({ question });

    if (!result) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.json({ answer: result.answer });
  } catch (error) {
    console.error("Error fetching answer from database:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSuggestions = async (req, res) => {
  const { question } = req.body;
  try {
    const existingQuestions = await Question.find({}, "question");
    const suggestions = existingQuestions
      .map((q) => q.question)
      .filter((q) => q.toLowerCase().includes(question.toLowerCase()));

    res.json({ suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitQuestion,
  getAnswerFromDatabase,
  getSuggestions,
};
