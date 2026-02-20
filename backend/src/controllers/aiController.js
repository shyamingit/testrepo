const OpenAI = require('openai');
const DailyLog = require('../models/DailyLog');
const { openAiApiKey } = require('../config/env');

const client = openAiApiKey ? new OpenAI({ apiKey: openAiApiKey }) : null;

const summarizeDailyLog = async (req, res, next) => {
  try {
    const { logId } = req.body;
    const log = await DailyLog.findOne({ _id: logId, user: req.user.id });
    if (!log) return res.status(404).json({ message: 'Daily log not found' });

    if (!client) {
      return res.status(400).json({ message: 'OPENAI_API_KEY is not configured' });
    }

    const prompt = `Summarize this founder productivity entry in 3 concise bullet points with one improvement tip:\nHours: ${log.codingHours}\nNotes: ${log.notes}`;

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt
    });

    const summary = response.output_text || 'No summary generated.';
    log.aiSummary = summary;
    await log.save();

    return res.json({ summary, log });
  } catch (error) {
    return next(error);
  }
};

module.exports = { summarizeDailyLog };
