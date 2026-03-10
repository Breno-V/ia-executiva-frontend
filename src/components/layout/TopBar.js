import Image from "next/image";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a href="#kpis" className={styles.navLink}>
            KPIs
          </a>
          <a href="#tendencia" className={styles.navLink}>
            Tendência
          </a>
        </div>

        <div className={styles.logoWrapper}>
          <Image
            src="/imagem-azul.jpeg"
            alt="Cristália"
            width={60}
            height={20}
            priority
          />
        </div>

        <div className={styles.navRight}>
          <a href="#mapa" className={styles.navLink}>
            Mapa
          </a>
          <a href="#ia" className={styles.navLink}>
            Análise IA
          </a>
        </div>
      </nav>
    </header>
  );
}
