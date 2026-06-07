export function neonStoreUnavailable() {
  return {
    ok: false as const,
    error: "Durable production persistence is not configured. Local file-backed writes are disabled outside demo mode."
  };
}
