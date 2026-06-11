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
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ceo@cristalia.com.br"
          />
          {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Senha</label>
          <input
            className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
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
