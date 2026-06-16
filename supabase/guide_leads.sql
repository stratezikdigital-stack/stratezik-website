-- ─── Gated guide leads (ChatGPT Ads Cheat Sheet + future lead magnets) ───────
-- Apply via Supabase dashboard SQL editor (same as schema.sql / aeo_checker.sql).
-- RLS enabled with NO policies: only the service-role client used by the public
-- API route (/api/guide-lead) can read/write. Reuse for future gated guides by
-- setting a different `source`.

CREATE TABLE IF NOT EXISTS guide_leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL,
  first_name  TEXT,
  vertical    TEXT,                            -- ecommerce | b2b-saas | local-services | agency | other | NULL
  consent     BOOLEAN NOT NULL DEFAULT FALSE,  -- CASL express consent, as ticked
  consent_ts  TIMESTAMPTZ,                     -- when consent was given
  ip          TEXT,                            -- captured for CASL record-keeping
  source      TEXT NOT NULL DEFAULT 'chatgpt-ads-cheat-sheet',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE guide_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_guide_leads_email   ON guide_leads(email);
CREATE INDEX IF NOT EXISTS idx_guide_leads_source  ON guide_leads(source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guide_leads_created ON guide_leads(created_at DESC);
