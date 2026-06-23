-- ─── GBP Local Visibility Scan — scans + leads + paid roadmaps ───────────────
-- Apply via Supabase dashboard SQL editor.

CREATE TABLE IF NOT EXISTS gbp_scans (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  city          TEXT NOT NULL,
  industry      TEXT NOT NULL,
  score         NUMERIC(5,2),
  place_id      TEXT,
  data_source   TEXT NOT NULL DEFAULT 'template',
  result        JSONB NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE gbp_scans ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_gbp_scans_business_created
  ON gbp_scans(business_name, city, created_at DESC);

CREATE TABLE IF NOT EXISTS gbp_leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL,
  name        TEXT,
  scan_id     UUID REFERENCES gbp_scans(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  city        TEXT NOT NULL,
  score       NUMERIC(5,2),
  consent     BOOLEAN NOT NULL DEFAULT FALSE,
  source      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE gbp_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_gbp_leads_email ON gbp_leads(email);
CREATE INDEX IF NOT EXISTS idx_gbp_leads_created ON gbp_leads(created_at DESC);

CREATE TABLE IF NOT EXISTS gbp_paid_roadmaps (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scan_id            UUID REFERENCES gbp_scans(id) ON DELETE SET NULL,
  stripe_session_id  TEXT NOT NULL UNIQUE,
  email              TEXT,
  business_name      TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE gbp_paid_roadmaps ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_gbp_paid_session ON gbp_paid_roadmaps(stripe_session_id);
