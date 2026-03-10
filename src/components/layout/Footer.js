import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <Image
          src="/imagem-azul.jpeg"
          alt="Cristália"
          width={80}
          height={28}
        />
        <a href="https://www.cristalia.com.br/" target="blank" className={styles.system}>Nosso site!</a>
        <p className={styles.copyright}>© {year} Cristália. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}