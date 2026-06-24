import api from "./client";
import type { ParsedFile } from "@/types";
import { isAxiosError } from "axios";

function quoteCsvField(field: string): string {
  if (
    field.includes(",") ||
    field.includes('"') ||
    field.includes("\n")
  ) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

async function normalizeCsvDelimiter(file: File): Promise<File> {
  if (!file.name.toLowerCase().endsWith(".csv")) return file;

  const text = await file.text();
  if (!text.includes(";")) return file;

  const commaCount = (text.match(/,/g) || []).length;
  const semicolonCount = (text.match(/;/g) || []).length;
  if (semicolonCount <= commaCount) return file;

  const lines = text.split(/\r?\n/);
  const normalizedLines = lines.map((line) => {
    if (!line.trim()) return line;
    const fields = line.split(";");
    return fields.map(quoteCsvField).join(",");
  });

  const normalized = normalizedLines.join("\n");
  return new File([normalized], file.name, { type: "text/csv" });
}

export async function uploadFile(file: File): Promise<ParsedFile> {
  const normalized = file.name.toLowerCase().endsWith(".csv")
    ? await normalizeCsvDelimiter(file)
    : file;

  const formData = new FormData();
  formData.append("file", normalized);

  try {
    const response = await api.post<{ data: ParsedFile }>(
      "/files/upload-with-parser",
      formData,
      {
        timeout: 30000,
        headers: { "Content-Type": null },
      },
    );

    const wrapper = response.data;
    if (!wrapper || !wrapper.data) {
      throw new Error("Resposta inesperada do servidor.");
    }

    const result = wrapper.data;

    if (result.status === "error") {
      throw new Error(result.error_message || "Erro ao processar arquivo.");
    }

    let parsedResultJson: Record<string, unknown> | null = null;
    if (typeof result.result_json === "string") {
      let sanitized: string = result.result_json;
      sanitized = sanitized.replace(/: -Infinity/g, ": null");
      sanitized = sanitized.replace(/: Infinity/g, ": null");
      sanitized = sanitized.replace(/: NaN/g, ": null");
      sanitized = sanitized.replace(/, -Infinity/g, ", null");
      sanitized = sanitized.replace(/, Infinity/g, ", null");
      sanitized = sanitized.replace(/, NaN/g, ", null");
      sanitized = sanitized.replace(/\[-Infinity/g, "[null");
      sanitized = sanitized.replace(/\[Infinity/g, "[null");
      sanitized = sanitized.replace(/\[NaN/g, "[null");
      try {
        parsedResultJson = JSON.parse(sanitized);
      } catch {
        parsedResultJson = null;
      }
    } else {
      parsedResultJson = result.result_json;
    }

    return { ...result, result_json: parsedResultJson };
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 413) {
        throw new Error("Arquivo muito grande. Máximo: 50MB.");
      }
      if (err.response?.status === 400) {
        throw new Error("Formato de arquivo não suportado.");
      }
      if (err.response?.status === 500) {
        const msg = (err.response.data as { message?: string })?.message;
        throw new Error(
          msg || "Erro interno do servidor ao processar o arquivo.",
        );
      }
      if (!err.response) {
        throw new Error("Não foi possível conectar ao servidor.");
      }
    }
    throw new Error("Erro ao enviar arquivo. Tente novamente.");
  }
}
