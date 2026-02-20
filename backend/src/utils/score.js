/**
 * Execution score architecture decision:
 * Keep formula in a pure utility for reusability and easy unit testing.
 */
const calculateWeeklyExecutionScore = ({ tasks, logs }) => {
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const totalHours = logs.reduce((acc, log) => acc + (log.codingHours || 0), 0);

  const taskPoints = completedTasks * 10;
  const hourPoints = Math.min(totalHours * 5, 350); // cap helps avoid skewed scores
  return Math.min(taskPoints + hourPoints, 1000);
};

module.exports = { calculateWeeklyExecutionScore };
