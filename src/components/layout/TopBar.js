"use client";

import Image from "next/image";
import { logout } from "@/libs/api";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
          <a href="#kpis" className={styles.navLink}>KPIs</a>
          <a href="#tendencia" className={styles.navLink}>Tendência</a>
          <a href="#mapa" className={styles.navLink}>Mapa</a>
          <a href="#ia" className={styles.navLink}>Análise IA</a>
          <button className={styles.logoutBtn} onClick={logout}> Sair </button>
      </nav>
    </header>
  );
}