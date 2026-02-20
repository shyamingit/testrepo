const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    codingHours: { type: Number, required: true, min: 0, max: 24 },
    notes: { type: String, default: '' },
    aiSummary: { type: String, default: '' }
  },
  { timestamps: true }
);

dailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
