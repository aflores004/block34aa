const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding the database.');
  try {
    // Clear the database.
    await prisma.student.deleteMany({});
    await prisma.instructor.deleteMany({});

    // Add instructors.
    const instructorPromises = [...Array(5)].map(() =>
      prisma.instructor.create({
        data: {
          username: `instructor${Math.floor(Math.random() * 100)}`, // Random username
          password: `password${Math.floor(Math.random() * 100)}`, // Random password
        },
      })
    );
    await Promise.all(instructorPromises);

    // Retrieve existing instructors to get valid instructor IDs.
    const existingInstructors = await prisma.instructor.findMany();

    // Add students.
    const studentPromises = [...Array(20)].map(() => {
      const randomInstructor = existingInstructors[Math.floor(Math.random() * existingInstructors.length)];
      return prisma.student.create({
        data: {
          name: `student${Math.floor(Math.random() * 100)}`, // Random student name
          cohort: `${Math.floor(Math.random() * 1000) + 2000}`, // Random cohort
          instructorId: randomInstructor.id,
        },
      });
    });
    await Promise.all(studentPromises);

    console.log('Database is seeded.');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
