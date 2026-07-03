-- Adds a business/company name column to the lead tables that were missing one.
-- gbp_leads already stores business_name (from the scan), so it's untouched.
-- Safe to run multiple times.

ALTER TABLE IF EXISTS guide_leads ADD COLUMN IF NOT EXISTS business_name TEXT;
ALTER TABLE IF EXISTS aeo_leads   ADD COLUMN IF NOT EXISTS business_name TEXT;
