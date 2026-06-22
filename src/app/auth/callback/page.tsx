"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("access_token", token);
      const isHttps = window.location.protocol === "https:";
      const secure = isHttps ? "; Secure" : "";
      document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict${secure}`;
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
      }}
    >
      <p style={{ opacity: 0.5 }}>Autenticando...</p>
    </div>
  );
}
