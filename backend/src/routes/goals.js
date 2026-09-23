const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: req.user.id },
      orderBy: [{ status: 'asc' }, { targetDate: 'asc' }],
    });
    res.json(goals);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const goal = await prisma.goal.create({
      data: {
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        targetDate: req.body.targetDate ? new Date(req.body.targetDate) : null,
        progress: Math.min(100, Math.max(0, Number(req.body.progress || 0))),
      },
    });
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const existing = await prisma.goal.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!existing) return res.status(404).json({ error: 'NOT_FOUND' });

    const goal = await prisma.goal.update({
      where: { id: existing.id },
      data: {
        title: req.body.title ?? undefined,
        description: req.body.description ?? undefined,
        targetDate: req.body.targetDate ? new Date(req.body.targetDate) : undefined,
        progress: req.body.progress == null ? undefined : Math.min(100, Math.max(0, Number(req.body.progress))),
        status: req.body.status ?? undefined,
      },
    });
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
