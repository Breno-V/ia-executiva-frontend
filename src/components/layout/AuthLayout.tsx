"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/api/auth";
import { wsClient } from "@/services/websocket";
import { LenisProvider } from "@/libs/LenisContext";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import AiContextCard from "@/components/ui/AiContextCard";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (localStorage.getItem("theme") as "dark" | "light") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark")
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (wsUrl) {
      const token = localStorage.getItem("access_token") || "";
      wsClient.connect(wsUrl, token);
    }
    return () => wsClient.disconnect();
  }, [router]);

  if (!mounted || !isAuthenticated()) {
    return null;
  }

  return (
    <LenisProvider>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.content}>
          <header className={styles.topBar}>
            <h1 className={styles.pageTitle}>{title || "Dashboard"}</h1>
            <div className={styles.topBarRight}>
              <button
                className={styles.themeBtn}
                onClick={toggle}
                aria-label={
                  theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
                }
              >
                {theme === "dark" ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <SearchBar />
            </div>
          </header>
          <main id="main-content" className={styles.main}>
            {children}
          </main>
          <Footer />
        </div>
        <AiContextCard />
      </div>
    </LenisProvider>
  );
}
