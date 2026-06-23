/**
 * Garante usuário admin no MySQL (upsert). Roda no start da aplicação.
 * Credenciais: ADMIN_BOOTSTRAP_EMAIL + ADMIN_BOOTSTRAP_PASSWORD (ou seed padrão).
 */
import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const ADMIN_EMAIL = process.env.ADMIN_BOOTSTRAP_EMAIL ?? "admin@nangell.com.br";
const ADMIN_PASSWORD = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "NangellAdmin@2026";

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.warn("[ensure-admin-user] DATABASE_URL ausente, pulando.");
    return;
  }

  const prisma = new PrismaClient();

  try {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await prisma.user.upsert({
      where: { email: ADMIN_EMAIL.toLowerCase().trim() },
      update: {
        name: "Administrador Nangell",
        passwordHash,
        role: UserRole.ADMIN,
      },
      create: {
        email: ADMIN_EMAIL.toLowerCase().trim(),
        name: "Administrador Nangell",
        passwordHash,
        role: UserRole.ADMIN,
      },
    });

    console.log(`[ensure-admin-user] OK ${ADMIN_EMAIL}`);
  } catch (error) {
    console.warn(
      "[ensure-admin-user] Falhou (login bootstrap ainda pode funcionar):",
      error instanceof Error ? error.message : error,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main();
