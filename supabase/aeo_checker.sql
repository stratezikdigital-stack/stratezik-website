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
  source      TEXT,                         -- utm_source / CTA attribution slug
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE aeo_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_aeo_leads_email ON aeo_leads(email);
CREATE INDEX IF NOT EXISTS idx_aeo_leads_created ON aeo_leads(created_at DESC);

-- ─── Paid deep scans (AI visibility + competitors + citations) ───────────────
CREATE TABLE IF NOT EXISTS aeo_deep_scans (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scan_id            UUID REFERENCES aeo_scans(id) ON DELETE SET NULL,
  stripe_session_id  TEXT NOT NULL UNIQUE,
  email              TEXT,
  domain             TEXT NOT NULL,
  result             JSONB NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE aeo_deep_scans ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_aeo_deep_scans_session ON aeo_deep_scans(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_aeo_deep_scans_email ON aeo_deep_scans(email);

-- ─── Paid full-site audits (sitemap-wide GEO crawl) ────────────────────────
CREATE TABLE IF NOT EXISTS aeo_sitemap_audits (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id  TEXT NOT NULL UNIQUE,
  email              TEXT,
  domain             TEXT NOT NULL,
  result             JSONB NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE aeo_sitemap_audits ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_aeo_sitemap_session ON aeo_sitemap_audits(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_aeo_sitemap_domain ON aeo_sitemap_audits(domain);
