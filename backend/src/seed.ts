import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

async function main() {
  const email = process.argv[2] ?? "admin@noctra.com";
  const password = process.argv[3] ?? "noctra2024";

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin criado: ${user.email}`);
  console.log(`Senha: ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
