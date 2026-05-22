export function neonStoreUnavailable() {
  return {
    ok: false as const,
    error: "Neon persistence requires DATABASE_URL. Local file-backed store is active until deployment secrets are configured."
  };
}
