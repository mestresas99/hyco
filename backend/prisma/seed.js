const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Ascent123!', 12);

  const pablo = await prisma.user.upsert({
    where: { email: 'pablo@ascent.app' },
    update: {},
    create: {
      email: 'pablo@ascent.app',
      passwordHash,
      name: 'Pablo Mestre',
      username: 'pablomestre',
      bio: 'Hybrid athlete · Hyrox · running · strength',
      goals: {
        create: {
          title: 'HYROX Madrid',
          description: 'Preparación específica',
          progress: 68,
          status: 'ACTIVE'
        }
      }
    }
  });

  const alex = await prisma.user.upsert({
    where: { email: 'alex@ascent.app' },
    update: {},
    create: {
      email: 'alex@ascent.app',
      passwordHash,
      name: 'Álex',
      username: 'alexrun'
    }
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria@ascent.app' },
    update: {},
    create: {
      email: 'maria@ascent.app',
      passwordHash,
      name: 'María',
      username: 'mariaruns'
    }
  });

  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: pablo.id, followingId: alex.id } },
    update: {},
    create: { followerId: pablo.id, followingId: alex.id }
  });

  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: pablo.id, followingId: maria.id } },
    update: {},
    create: { followerId: pablo.id, followingId: maria.id }
  });

  const community = await prisma.community.upsert({
    where: { name: 'Hybrid Athletes Madrid' },
    update: {},
    create: {
      name: 'Hybrid Athletes Madrid',
      description: 'Running, fuerza y Hyrox',
      icon: 'activity'
    }
  });

  await prisma.communityMember.upsert({
    where: { userId_communityId: { userId: pablo.id, communityId: community.id } },
    update: {},
    create: { userId: pablo.id, communityId: community.id, role: 'MEMBER' }
  });

  await prisma.activity.createMany({
    data: [
      { userId: pablo.id, type: 'RUN', title: 'Intervalos', description: '6 × 800 m', durationMin: 52, distanceKm: 8.4, pace: '4:00/km', intensity: 'Z4' },
      { userId: pablo.id, type: 'GYM', title: 'Fuerza tren superior', description: 'Empuje', durationMin: 45, intensity: 'Media' },
      { userId: alex.id, type: 'RUN', title: 'Series 8×800m', description: 'Trabajo de velocidad', durationMin: 48, distanceKm: 8.2, pace: '4:15/km', intensity: 'Z4' }
    ]
  });

  await prisma.post.createMany({
    data: [
      { userId: alex.id, text: 'Series de 8×800m a 4:15/km. Las primeras cuatro se sintieron fáciles.', type: 'RUN' },
      { userId: maria.id, text: 'Creo que necesito una semana de descarga antes de que me lo pida el cuerpo.', type: 'TRAINING' },
      { userId: pablo.id, text: 'Nuevo bloque de preparación para HYROX. A por ello.', type: 'GOAL' }
    ]
  });

  console.log('Ascent seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
