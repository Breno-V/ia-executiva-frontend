"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import styles from "./login.module.css";

const loginSchema = z.object({
  email: z.email("Informe um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error: authError, token } = useAuth();
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    document.title = "Login | IA Executiva";
    if (token) {
      router.replace("/");
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("registered") === "true") setRegistered(true);
    }
  }, [token, router]);
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
            maxLength={254}
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
              maxLength={128}
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

        {registered && <p className={styles.success}>Conta criada! Faça login.</p>}
        {(error || authError) && <p className={styles.error}>{error || authError}</p>}

        <button className={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>ou</span>
          <span className={styles.dividerLine} />
        </div>

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
          className={styles.googleButton}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Entrar com Google
        </a>

        <p className={styles.linkText}>
          Não tem conta?{" "}
          <Link href="/register" className={styles.link}>Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
