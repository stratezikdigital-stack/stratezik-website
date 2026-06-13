-- Run once in Supabase SQL editor if aeo_leads already exists without source.
ALTER TABLE aeo_leads ADD COLUMN IF NOT EXISTS source TEXT;
CREATE INDEX IF NOT EXISTS idx_aeo_leads_source ON aeo_leads(source) WHERE source IS NOT NULL;
