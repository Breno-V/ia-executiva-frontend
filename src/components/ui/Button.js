// Botão Genérico
import styles from "./Button.module.css";

export default function Button({ label, onClick, disabled = false }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}