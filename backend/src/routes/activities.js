const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' },
      take: 50,
    });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const activity = await prisma.activity.create({
      data: {
        userId: req.user.id,
        type: req.body.type || 'OTHER',
        title: req.body.title,
        description: req.body.description,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        durationMin: req.body.durationMin == null ? null : Number(req.body.durationMin),
        distanceKm: req.body.distanceKm == null ? null : Number(req.body.distanceKm),
        pace: req.body.pace,
        intensity: req.body.intensity,
        metadata: req.body.metadata || undefined,
      },
    });
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
