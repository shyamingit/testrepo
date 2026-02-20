import { useState } from 'react';
import api from '../api/client';

const CodingLogForm = ({ refresh }) => {
  const [codingHours, setCodingHours] = useState(2);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post('/dashboard/logs', {
      date: new Date().toISOString().slice(0, 10),
      codingHours: Number(codingHours),
      notes
    });
    setNotes('');
    refresh();
  };

  return (
    <form className="glass panel" onSubmit={handleSubmit}>
      <h3>Daily Coding Log</h3>
      <input type="number" min="0" max="24" value={codingHours} onChange={(e) => setCodingHours(e.target.value)} required />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What did you build today?" />
      <button className="btn" type="submit">Save log</button>
    </form>
  );
};

export default CodingLogForm;
