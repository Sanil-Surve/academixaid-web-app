const OpenAI = require('openai');
const Question = require('../models/Question');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY
});

console.log(openai)

async function getAnswer(question) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'user', content: `Give Answer of this question: ${question}` },
    ],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content;
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
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  submitQuestion,
};
