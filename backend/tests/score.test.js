const { calculateWeeklyExecutionScore } = require('../src/utils/score');

describe('calculateWeeklyExecutionScore', () => {
  it('returns expected score', () => {
    const result = calculateWeeklyExecutionScore({
      tasks: [{ status: 'done' }, { status: 'todo' }, { status: 'done' }],
      logs: [{ codingHours: 3 }, { codingHours: 2 }]
    });

    expect(result).toBe(45);
  });

  it('caps score at 1000', () => {
    const tasks = Array.from({ length: 200 }).map(() => ({ status: 'done' }));
    const logs = Array.from({ length: 7 }).map(() => ({ codingHours: 20 }));
    expect(calculateWeeklyExecutionScore({ tasks, logs })).toBe(1000);
  });
});
