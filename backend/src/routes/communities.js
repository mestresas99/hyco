const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const communities = await prisma.community.findMany({
      include: { _count: { select: { members: true } } },
      orderBy: { name: 'asc' },
    });
    res.json(communities);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/join', requireAuth, async (req, res, next) => {
  try {
    const existing = await prisma.communityMember.findUnique({
      where: { userId_communityId: { userId: req.user.id, communityId: req.params.id } },
    });

    if (existing) {
      await prisma.communityMember.delete({ where: { id: existing.id } });
      return res.json({ joined: false });
    }

    await prisma.communityMember.create({
      data: { userId: req.user.id, communityId: req.params.id },
    });

    res.json({ joined: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
