"use client";

import { useState, useCallback } from "react";
import { uploadFile } from "@/services/api/files";
import type { ParsedFile, FileUploadState } from "@/types";
import { SUPPORTED_FORMATS, MAX_UPLOAD_SIZE } from "@/types";

const ALLOWED_EXTENSIONS = Object.values(SUPPORTED_FORMATS).flatMap(
  (f) => f.extensions,
) as string[];

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<FileUploadState>("idle");
  const [result, setResult] = useState<ParsedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((f: File): string | null => {
    const ext =
      "." + (f.name.split(".").pop()?.toLowerCase() || "");
    if (!ALLOWED_EXTENSIONS.includes(ext))
      return "Formato não suportado. Aceitos: CSV, XLSX, PDF, XML.";
    if (f.size > MAX_UPLOAD_SIZE)
      return `Arquivo muito grande. Máximo: 50MB.`;
    if (f.size === 0) return "Arquivo vazio.";
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (f: File | null) => {
      setFile(f);
      setResult(null);
      setError(null);
      setState("idle");
    },
    [],
  );

  const upload = useCallback(async () => {
    if (!file) return;
    setState("uploading");
    setError(null);
    try {
      const data = await uploadFile(file);
      setResult(data);
      setState("done");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro desconhecido.";
      if (
        message.includes("timeout") ||
        message.includes("connect")
      )
        setError("Não foi possível conectar ao servidor.");
      else setError(message);
      setState("error");
    }
  }, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  return {
    file,
    handleFileSelect,
    state,
    result,
    error,
    validate,
    upload,
    reset,
  };
}
