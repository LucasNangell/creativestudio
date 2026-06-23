import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export type ResolvedAdminUser = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

const DEFAULT_BOOTSTRAP_EMAIL = "admin@nangell.com.br";
const DEFAULT_BOOTSTRAP_PASSWORD = "NangellAdmin@2026";

function getBootstrapCredentials() {
  return {
    email: (process.env.ADMIN_BOOTSTRAP_EMAIL ?? DEFAULT_BOOTSTRAP_EMAIL)
      .toLowerCase()
      .trim(),
    password: process.env.ADMIN_BOOTSTRAP_PASSWORD ?? DEFAULT_BOOTSTRAP_PASSWORD,
  };
}

async function verifyDbUser(
  email: string,
  password: string,
): Promise<ResolvedAdminUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

async function verifyBootstrapUser(
  email: string,
  password: string,
): Promise<ResolvedAdminUser | null> {
  const bootstrap = getBootstrapCredentials();

  if (email !== bootstrap.email || password !== bootstrap.password) {
    return null;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.upsert({
      where: { email: bootstrap.email },
      update: {
        passwordHash,
        name: "Administrador Nangell",
        role: UserRole.ADMIN,
      },
      create: {
        email: bootstrap.email,
        passwordHash,
        name: "Administrador Nangell",
        role: UserRole.ADMIN,
      },
    });

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("[resolveAdminLogin] bootstrap upsert failed", error);
    return {
      userId: "bootstrap-admin",
      email: bootstrap.email,
      name: "Administrador Nangell",
      role: UserRole.ADMIN,
    };
  }
}

export async function resolveAdminLogin(
  email: string,
  password: string,
): Promise<ResolvedAdminUser | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const dbUser = await verifyDbUser(normalizedEmail, password);
    if (dbUser) return dbUser;
  } catch (error) {
    console.error("[resolveAdminLogin] database lookup failed", error);
  }

  return verifyBootstrapUser(normalizedEmail, password);
}

export function isAdminSessionConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return Boolean(secret && secret.length >= 32);
}

export const ADMIN_SESSION_MISCONFIGURED_ERROR =
  "Painel administrativo indisponível: configure ADMIN_SESSION_SECRET (32+ caracteres) no servidor.";
