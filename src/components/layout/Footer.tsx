import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <a
          href="https://www.cristalia.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.brand}
        >
          Cristália
        </a>
        <p className={styles.copyright}>
          &copy; {year} Cristália. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
