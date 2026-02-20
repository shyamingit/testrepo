import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import TaskList from '../components/TaskList';
import CodingLogForm from '../components/CodingLogForm';
import ProductivityChart from '../components/ProductivityChart';

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState({ tasks: [], logs: [], weeklyExecutionScore: 0 });
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', status: 'todo' });

  const loadDashboard = async () => {
    const { data } = await api.get('/dashboard');
    setDashboard(data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const submitTask = async (e) => {
    e.preventDefault();
    await api.post('/dashboard/tasks', newTask);
    setNewTask({ title: '', priority: 'medium', status: 'todo' });
    loadDashboard();
  };

  const doneCount = useMemo(() => dashboard.tasks.filter((t) => t.status === 'done').length, [dashboard.tasks]);

  return (
    <main className="dashboard-bg">
      <Navbar />
      <section className="grid stats">
        <StatsCard title="Execution Score" value={dashboard.weeklyExecutionScore} />
        <StatsCard title="Completed Tasks" value={doneCount} />
        <StatsCard title="Coding Sessions" value={dashboard.logs.length} />
      </section>

      <section className="grid two-col">
        <CodingLogForm refresh={loadDashboard} />
        <form className="glass panel" onSubmit={submitTask}>
          <h3>Add Startup Task</h3>
          <input value={newTask.title} required placeholder="Task title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="btn" type="submit">Add task</button>
        </form>
      </section>

      <section className="grid two-col">
        <TaskList tasks={dashboard.tasks} refresh={loadDashboard} />
        <ProductivityChart logs={dashboard.logs} />
      </section>
    </main>
  );
};

export default DashboardPage;
