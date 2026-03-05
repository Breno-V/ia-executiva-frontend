//Título de seção
import styles from "./SectionTitle.module.css";

export default function SectionTitle({ title }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}