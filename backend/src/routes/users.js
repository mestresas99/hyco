const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const userSelect = {
  id: true,
  name: true,
  username: true,
  email: true,
  bio: true,
  avatarUrl: true,
  createdAt: true,
};

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        ...userSelect,
        _count: { select: { followers: true, following: true, posts: true, activities: true } },
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        ...userSelect,
        _count: { select: { followers: true, following: true, posts: true, activities: true } },
      },
    });
    if (!user) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/follow', requireAuth, async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) return res.status(400).json({ error: 'SELF_FOLLOW' });

    const existing = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId: req.user.id, followingId: req.params.id } },
    });

    if (existing) {
      await prisma.follow.delete({ where: { id: existing.id } });
      return res.json({ following: false });
    }

    await prisma.follow.create({
      data: { followerId: req.user.id, followingId: req.params.id },
    });

    await prisma.notification.create({
      data: {
        recipientId: req.params.id,
        actorId: req.user.id,
        type: 'FOLLOW',
        message: 'ha empezado a seguirte',
      },
    });

    res.json({ following: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
