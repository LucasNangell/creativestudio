import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe o e-mail.")
    .email("Informe um e-mail válido.")
    .max(255),
  password: z
    .string()
    .min(1, "Informe a senha.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(128),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const GENERIC_LOGIN_ERROR =
  "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";

export const LOGIN_BLOCKED_ERROR =
  "Muitas tentativas inválidas. Aguarde alguns minutos antes de tentar novamente.";
