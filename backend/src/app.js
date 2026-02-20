const express = require('express');
const cors = require('cors');
const apiLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { clientOrigin } = require('./config/env');

/**
 * App-level composition decision:
 * all infrastructure middleware is loaded before feature routes
 * to keep route modules focused on business behavior.
 */
const app = express();

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

app.use(errorHandler);

module.exports = app;
