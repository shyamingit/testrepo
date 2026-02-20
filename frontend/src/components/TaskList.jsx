import api from '../api/client';

const TaskList = ({ tasks, refresh }) => {
  const setStatus = async (taskId, status) => {
    await api.patch(`/dashboard/tasks/${taskId}`, { status });
    refresh();
  };

  return (
    <div className="glass panel">
      <h3>Startup Tasks</h3>
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <div>
            <strong>{task.title}</strong>
            <small>{task.priority}</small>
          </div>
          <select value={task.status} onChange={(e) => setStatus(task._id, e.target.value)}>
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
