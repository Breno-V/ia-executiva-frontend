"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/libs/api";
import { LenisProvider } from "@/libs/LenisContext";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import styles from "./AuthLayout.module.css";

export default function AuthLayout({ children, title }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null;
  }

  return (
    <LenisProvider>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.content}>
          <header className={styles.topBar}>
            <h1 className={styles.pageTitle}>{title || "Dashboard"}</h1>
            <SearchBar />
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </LenisProvider>
  );
}
