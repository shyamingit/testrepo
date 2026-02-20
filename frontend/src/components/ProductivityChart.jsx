import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ProductivityChart = ({ logs }) => {
  const chartData = logs.map((log) => ({
    day: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: log.codingHours
  }));

  return (
    <div className="glass panel">
      <h3>Last 7 Days Productivity</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" opacity={0.2} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#14b8a6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;
