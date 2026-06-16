"use client";

import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
