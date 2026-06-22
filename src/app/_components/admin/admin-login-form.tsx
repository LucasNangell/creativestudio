"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  adminLoginSchema,
  GENERIC_LOGIN_ERROR,
  LOGIN_BLOCKED_ERROR,
  type AdminLoginInput,
} from "@/lib/validations/admin-auth";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminLoginInput) {
    setServerError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        setServerError(result.error ?? GENERIC_LOGIN_ERROR);
        return;
      }

      const redirect = searchParams.get("redirect") ?? "/admin";
      router.push(redirect.startsWith("/admin") ? redirect : "/admin");
      router.refresh();
    } catch {
      setServerError("Não foi possível conectar ao servidor. Tente novamente.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex justify-center">
          <BrandLogo variant="horizontal" className="h-8 w-auto" />
        </Link>
        <h1 className="mt-6 font-heading text-2xl font-bold text-nangell-text">
          Painel administrativo
        </h1>
        <p className="mt-2 text-sm text-nangell-muted">
          Acesso restrito à equipe Nangell Creative Studio
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="glass-card space-y-5 p-6 sm:p-8"
        aria-busy={isSubmitting}
      >
        <Input
          label="E-mail"
          type="email"
          autoComplete="username"
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register("email")}
        />

        <Input
          label="Senha"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register("password")}
        />

        {serverError ? (
          <p
            role="alert"
            className="rounded-nangell border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {serverError === LOGIN_BLOCKED_ERROR ? (
              serverError
            ) : (
              <>
                <Lock className="mr-1 inline h-4 w-4" aria-hidden />
                {serverError}
              </>
            )}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Entrando...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" aria-hidden />
              Entrar
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-nangell-muted">
        Credenciais inválidas não revelam se o e-mail está cadastrado.
      </p>
    </div>
  );
}
