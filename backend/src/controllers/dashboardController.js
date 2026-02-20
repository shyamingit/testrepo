const Task = require('../models/Task');
const DailyLog = require('../models/DailyLog');
const { calculateWeeklyExecutionScore } = require('../utils/score');

const addTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

const addOrUpdateLog = async (req, res, next) => {
  try {
    const { date, codingHours, notes } = req.body;
    const log = await DailyLog.findOneAndUpdate(
      { user: req.user.id, date: new Date(date) },
      { codingHours, notes },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json(log);
  } catch (error) {
    return next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);

    const [tasks, logs] = await Promise.all([
      Task.find({ user: req.user.id }).sort({ createdAt: -1 }),
      DailyLog.find({ user: req.user.id, date: { $gte: weekAgo, $lte: now } }).sort({ date: 1 })
    ]);

    const weeklyExecutionScore = calculateWeeklyExecutionScore({ tasks, logs });

    return res.json({ tasks, logs, weeklyExecutionScore });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const DailyUser = require('../models/User');
    const users = await DailyUser.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { addTask, updateTask, addOrUpdateLog, getDashboard, getAllUsers };
