require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');
const goalRoutes = require('./routes/goals');
const postRoutes = require('./routes/posts');
const communityRoutes = require('./routes/communities');
const notificationRoutes = require('./routes/notifications');

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({
  origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN,
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'ascent-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/notifications', notificationRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Error interno del servidor' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Ascent API running on http://0.0.0.0:${port}`);
});
