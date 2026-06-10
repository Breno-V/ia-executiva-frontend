"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  }

  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar por área, risco ou diagnóstico..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
