"use client";

import { useRef, useState, useCallback, type DragEvent, type ChangeEvent } from "react";
import { SUPPORTED_FORMATS } from "@/types";
import styles from "./FileDropZone.module.css";

interface FileDropZoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  validate: (file: File) => string | null;
  disabled?: boolean;
}

const ALLOWED_STR = Object.values(SUPPORTED_FORMATS)
  .flatMap((f) => f.extensions)
  .join(",");

const FORMATS_LABEL = Object.keys(SUPPORTED_FORMATS)
  .map((k) => k.toUpperCase())
  .join(", ");

export default function FileDropZone({
  file,
  onFileSelect,
  validate,
  disabled,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFile = useCallback(
    (f: File) => {
      const err = validate(f);
      if (err) {
        setValidationError(err);
        onFileSelect(null);
      } else {
        setValidationError(null);
        onFileSelect(f);
      }
    },
    [validate, onFileSelect],
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [disabled, handleFile],
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const onClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
      e.target.value = "";
    },
    [handleFile],
  );

  const hasFile = !!file;
  const showError = !!validationError;

  let zoneClass = styles.zone;
  if (disabled) zoneClass += ` ${styles.disabled}`;
  if (dragging) zoneClass += ` ${styles.dragging}`;
  if (hasFile && !showError) zoneClass += ` ${styles.hasFile}`;
  if (showError) zoneClass += ` ${styles.hasError}`;

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const inputId = "file-upload-input";

  return (
    <div>
      <div
        className={zoneClass}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Selecione um arquivo para upload"
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          hidden
          accept={ALLOWED_STR}
          onChange={onChange}
          disabled={disabled}
          aria-hidden="true"
        />

        {hasFile && !showError ? (
          <div className={styles.fileInfo}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <div>
              <p className={styles.fileName}>{file!.name}</p>
              <p className={styles.fileSize}>{formatSize(file!.size)}</p>
            </div>
          </div>
        ) : (
          <>
            <svg
              className={styles.uploadIcon}
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className={styles.hint}>
              <span className={styles.hintBold}>Clique para selecionar</span>{" "}
              ou arraste um arquivo aqui
            </p>
            <p className={styles.formats}>{FORMATS_LABEL}</p>
            <p className={styles.limit}>Máximo: 50MB</p>
          </>
        )}
      </div>

      {showError && (
        <p className={styles.errorMsg} role="alert">
          {validationError}
        </p>
      )}
    </div>
  );
}
