const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seeder untuk menambahkan data user
  await prisma.users.create({
    data: {
      name: "admin",
      email: "admin@admin.com",
      password: "admin", // Pastikan mengenkripsi password di aplikasi produksi
    },
  });

  const newProject = await prisma.project.create({
    data: {
      title: "LUDOang",
      desc: "LUDOang is a game created using python and pygame. This game is inspired by LUDO game.",
      tech: "Python, Pygame, OpenGL",
      bg: "LUDOang",
      slug: "ludoang",
      category: 9,
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
