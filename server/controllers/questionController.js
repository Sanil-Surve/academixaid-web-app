require("dotenv").config();
const Groq = require("groq-sdk");
const Question = require("../models/Question");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getAnswer(question, model = "openai/gpt-oss-20b") {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: model,
      messages: [
        { role: "user", content: `Give Answer of this question: ${question}` },
      ],
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium",
    });
    const answer = chatCompletion.choices[0]?.message?.content || "";
    return answer;
  } catch (error) {
    console.error("Error fetching answer from Groq:", error.message);
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
