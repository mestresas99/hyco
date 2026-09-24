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

  const daniel = await prisma.user.upsert({
    where: { email: 'daniel@ascent.app' },
    update: {},
    create: {
      email: 'daniel@ascent.app',
      passwordHash,
      name: 'Daniel',
      username: 'daniel703'
    }
  });

  const lucia = await prisma.user.upsert({
    where: { email: 'lucia@ascent.app' },
    update: {},
    create: {
      email: 'lucia@ascent.app',
      passwordHash,
      name: 'Lucía',
      username: 'luciatrail'
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

  const demoPosts = [
    { userId: alex.id, text: 'Series de 8×800m a 4:15/km. Las primeras cuatro se sintieron fáciles.', type: 'RUNNING' },
    { userId: maria.id, text: 'Sesión HYROX: sled push, SkiErg y carrera. Hoy tocó trabajar la transición entre estaciones.', type: 'HYROX' },
    { userId: pablo.id, text: 'Nuevo bloque de preparación para HYROX. A por ello.', type: 'HYROX' },
    { userId: daniel.id, text: 'Nuevo objetivo: bajar de 5h en el 70.3 de este año. Empiezo el bloque específico esta semana.', type: 'IRONMAN' },
    { userId: daniel.id, text: 'Primer brick del bloque: bici larga + 6 km de carrera controlada. La transición empieza a sentirse natural.', type: 'IRONMAN' },
    { userId: lucia.id, text: 'Salida de trail de 18 km con 820 m+. Mucho desnivel, pero piernas muy buenas en la segunda mitad.', type: 'TRAIL' },
    { userId: lucia.id, text: 'Probando una ruta nueva de montaña. El objetivo era mantener esfuerzo constante en las subidas.', type: 'TRAIL' },
    { userId: pablo.id, text: 'Fuerza tren superior: empuje, dominadas y trabajo accesorio. 45 min bien aprovechados.', type: 'GYM' },
    { userId: alex.id, text: 'Rodaje progresivo de 10 km. Últimos 3 km cerca del ritmo objetivo.', type: 'RUNNING' }
  ];

  for (const post of demoPosts) {
    const existing = await prisma.post.findFirst({
      where: { userId: post.userId, text: post.text, type: post.type }
    });
    if (!existing) {
      await prisma.post.create({ data: post });
    }
  }

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
