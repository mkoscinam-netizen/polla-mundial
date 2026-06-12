-- ============================================================
--  Polla Mundial 2026 — Schema Supabase
--  Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Resultados de partidos (grupo + eliminatoria)
CREATE TABLE IF NOT EXISTS match_results (
  match_id     INTEGER PRIMARY KEY,
  home_score   INTEGER NOT NULL,
  away_score   INTEGER NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Configuración global: equipos clasificados por ronda + especiales
--    Claves usadas:
--      r32          → JSONB array de 32 equipos clasificados desde grupos
--      r16          → JSONB array de 16 equipos que pasaron 16avos
--      qf           → JSONB array de 8 equipos en cuartos
--      sf           → JSONB array de 4 equipos en semis
--      final_teams  → JSONB array de 2 finalistas
--      campeon      → text (equipo campeón)
--      tercero      → text (equipo tercer lugar)
--      bota_oro     → text (jugador bota de oro)
--      balon_oro    → text (jugador balón de oro)
CREATE TABLE IF NOT EXISTS settings (
  key          TEXT PRIMARY KEY,
  value        JSONB NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings      ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "public_read_results"  ON match_results FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_settings" ON settings      FOR SELECT TO anon USING (true);

-- Escritura pública (protección a nivel de UI con contraseña)
CREATE POLICY "public_write_results"  ON match_results FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "public_write_settings" ON settings      FOR ALL TO anon USING (true) WITH CHECK (true);

-- ── Realtime ─────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE match_results;
ALTER PUBLICATION supabase_realtime ADD TABLE settings;
