"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./AiContextCard.module.css";

export default function AiContextCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.card} ${open ? styles.open : ""}`}>
      <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label={open ? "Fechar contexto da IA" : "Abrir contexto da IA"}>
        <Image src="/X-icon.svg" alt="" width={20} height={20} />
      </button>
      {open && (
        <div className={styles.body}>
          <h3 className={styles.title}>IA Executiva</h3>
          <p className={styles.text}>
            Este sistema utiliza inteligência artificial para analisar dados financeiros e operacionais da Cristália, gerando insights estratégicos, alertas inteligentes e recomendações acionáveis para a liderança.
          </p>
          <ul className={styles.list}>
            <li>Análise de receita e despesas em tempo real</li>
            <li>Detecção automática de riscos e anomalias</li>
            <li>Projeções financeiras para 90, 180 e 360 dias</li>
            <li>Monitoramento de KPIs por unidade de negócio</li>
            <li>Chatbot executivo para perguntas estratégicas</li>
          </ul>
        </div>
      )}
    </div>
  );
}
