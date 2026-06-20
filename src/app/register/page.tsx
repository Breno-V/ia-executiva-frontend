"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { z } from "zod";
import styles from "./register.module.css";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter ao menos 2 caracteres"),
    email: z.email("Informe um email válido"),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha"),
    companyName: z.string().min(2, "Informe o nome da empresa").optional().or(z.literal("")),
    companyAddress: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError("");
    setFieldErrors({});
    const result = registerSchema.safeParse({
      name, email, password, confirmPassword,
      companyName: companyName || undefined,
      companyAddress: companyAddress || undefined,
    });
    if (!result.success) {
      const fieldMap: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldMap[field]) fieldMap[field] = issue.message;
      }
      setFieldErrors(fieldMap);
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, companyName || undefined, companyAddress || undefined);
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>IA Executiva</h1>
        <p className={styles.subtitle}>Criar conta</p>

        <div className={styles.sectionTitle}>Seus dados</div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-name">Nome</label>
          <input
            id="reg-name"
            className={`${styles.input} ${fieldErrors.name ? styles.inputError : ""}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
          {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ceo@cristalia.com.br"
          />
          {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-password">Senha</label>
          <div className={styles.passwordWrapper}>
            <input
              id="reg-password"
              className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          {fieldErrors.password && <p className={styles.fieldError}>{fieldErrors.password}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-confirm">Confirmar senha</label>
          <div className={styles.passwordWrapper}>
            <input
              id="reg-confirm"
              className={`${styles.input} ${fieldErrors.confirmPassword ? styles.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senhas" : "Mostrar senhas"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && <p className={styles.fieldError}>{fieldErrors.confirmPassword}</p>}
        </div>

        <div className={styles.sectionTitle}>Sua empresa</div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-company">Nome da empresa</label>
          <input
            id="reg-company"
            className={`${styles.input} ${fieldErrors.companyName ? styles.inputError : ""}`}
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Cristália"
          />
          {fieldErrors.companyName && <p className={styles.fieldError}>{fieldErrors.companyName}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reg-address">Endereço <span className={styles.optional}>(opcional)</span></label>
          <input
            id="reg-address"
            className={`${styles.input} ${fieldErrors.companyAddress ? styles.inputError : ""}`}
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Av. Paulista, 1000"
          />
          {fieldErrors.companyAddress && <p className={styles.fieldError}>{fieldErrors.companyAddress}</p>}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} onClick={handleRegister} disabled={loading}>
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>

        <p className={styles.linkText}>
          Já tem conta?{" "}
          <Link href="/login" className={styles.link}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
