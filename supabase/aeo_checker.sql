-- ─── AEO Readiness Checker — scans + leads ──────────────────────────────────
-- Apply via Supabase dashboard SQL editor (same as schema.sql).
-- Both tables have RLS enabled with NO policies: only the service-role client
-- used by the public API routes can read/write them. Team members view leads
-- through the dashboard or a future admin page.

CREATE TABLE IF NOT EXISTS aeo_scans (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain        TEXT NOT NULL,
  total         NUMERIC(4,2),               -- NULL when unverifiable
  unverifiable  BOOLEAN NOT NULL DEFAULT FALSE,
  result        JSONB NOT NULL,             -- full AeoScanResult (criteria, evidence, splits)
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE aeo_scans ENABLE ROW LEVEL SECURITY;

-- Serves the 24h per-domain cache lookup
CREATE INDEX IF NOT EXISTS idx_aeo_scans_domain_created
  ON aeo_scans(domain, created_at DESC);

CREATE TABLE IF NOT EXISTS aeo_leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL,
  name        TEXT,
  domain      TEXT NOT NULL,
  scan_id     UUID REFERENCES aeo_scans(id) ON DELETE SET NULL,
  score       NUMERIC(4,2),                 -- NULL when scan was unverifiable
  sub_scores  JSONB NOT NULL DEFAULT '{}',  -- { criterion_key: score | "unverifiable" }
  consent     BOOLEAN NOT NULL DEFAULT FALSE, -- CASL express consent, as ticked
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE aeo_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_aeo_leads_email ON aeo_leads(email);
CREATE INDEX IF NOT EXISTS idx_aeo_leads_created ON aeo_leads(created_at DESC);
