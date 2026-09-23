const express = require('express');
const prisma = require('../lib/prisma');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function postInclude(viewerId) {
  return {
    user: { select: { id: true, name: true, username: true, avatarUrl: true } },
    _count: { select: { comments: true, likes: true } },
    likes: { where: { userId: viewerId }, select: { id: true } },
  };
}

function serialize(post) {
  return {
    ...post,
    likedByMe: post.likes.length > 0,
    likes: undefined,
  };
}

router.get('/feed', requireAuth, async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: postInclude(req.user.id),
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json(posts.map(serialize));
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (!req.body.text?.trim() && !req.body.mediaUrl) {
      return res.status(400).json({ error: 'EMPTY_POST' });
    }

    const post = await prisma.post.create({
      data: {
        userId: req.user.id,
        text: req.body.text?.trim() || null,
        mediaUrl: req.body.mediaUrl || null,
        mediaType: req.body.mediaType || null,
        type: req.body.type || 'TRAINING',
      },
      include: postInclude(req.user.id),
    });

    res.status(201).json(serialize(post));
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like', requireAuth, async (req, res, next) => {
  try {
    const existing = await prisma.like.findUnique({
      where: { postId_userId: { postId: req.params.id, userId: req.user.id } },
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return res.json({ liked: false });
    }

    const post = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'NOT_FOUND' });

    await prisma.like.create({ data: { postId: post.id, userId: req.user.id } });
    if (post.userId !== req.user.id) {
      await prisma.notification.create({
        data: {
          recipientId: post.userId,
          actorId: req.user.id,
          type: 'LIKE',
          message: 'ha indicado que le gusta tu publicación',
        },
      });
    }

    res.json({ liked: true });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/comments', requireAuth, async (req, res, next) => {
  try {
    if (!req.body.text?.trim()) return res.status(400).json({ error: 'EMPTY_COMMENT' });

    const post = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'NOT_FOUND' });

    const comment = await prisma.comment.create({
      data: { postId: post.id, userId: req.user.id, text: req.body.text.trim() },
      include: { user: { select: { id: true, name: true, username: true, avatarUrl: true } } },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
