const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function query(sql, params, callback) {
  // This function is not necessary with Prisma
  // You can directly use Prisma's query functions
}

module.exports = { prisma };
