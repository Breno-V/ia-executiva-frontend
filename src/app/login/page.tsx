"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import styles from "./login.module.css";

const loginSchema = z.object({
  email: z.string().email("Informe um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleLogin() {
    setError("");
    setFieldErrors({});
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldMap: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        fieldMap[field] = issue.message;
      }
      setFieldErrors(fieldMap);
      return;
    }
    try {
      await login(email, password);
      router.push("/");
    } catch {
      setError("Email ou senha incorretos.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>IA Executiva</h1>
        <p className={styles.subtitle}>Cristália</p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ceo@cristalia.com.br"
          />
          {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-password">Senha</label>
          <div className={styles.passwordWrapper}>
            <input
              id="login-password"
              className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
          {fieldErrors.password && <p className={styles.fieldError}>{fieldErrors.password}</p>}
        </div>

        {(error || authError) && <p className={styles.error}>{error || authError}</p>}

        <button className={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}
