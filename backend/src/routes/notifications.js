const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { recipientId: req.user.id },
      include: { actor: { select: { id: true, name: true, username: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/read', requireAuth, async (req, res, next) => {
  try {
    const notification = await prisma.notification.updateMany({
      where: { id: req.params.id, recipientId: req.user.id },
      data: { read: true },
    });
    res.json({ ok: notification.count === 1 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
