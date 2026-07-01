-- ─── Paid orders ledger (AEO + GBP paid reports) ─────────────────────────────
-- Apply via the Supabase dashboard SQL editor (same as guide_leads.sql).
--
-- Source of truth for "who paid": written by the Stripe webhook on
-- checkout.session.completed AND by the unlock flow, so a payment is recorded
-- even if the customer never returns to the success page. `delivered` flips to
-- true only when the report is successfully generated (and, for GBP, emailed).
-- The reconciliation cron and the unlock error path alert us on any paid order
-- that is not delivered so we can retry, deliver manually, or issue a credit.
--
-- RLS enabled with NO policies: only the service-role API client can touch it.

CREATE TABLE IF NOT EXISTS paid_orders (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_session_id  TEXT UNIQUE NOT NULL,
  product            TEXT NOT NULL,                    -- aeo-report | aeo-sitemap | gbp-roadmap
  email              TEXT,
  scan_id            TEXT,
  domain             TEXT,
  amount_cents       INTEGER,
  currency           TEXT,
  status             TEXT NOT NULL DEFAULT 'paid',     -- paid | delivered | processing_failed
  delivered          BOOLEAN NOT NULL DEFAULT FALSE,
  delivered_at       TIMESTAMPTZ,
  attempts           INTEGER NOT NULL DEFAULT 0,       -- delivery attempts that failed
  last_error         TEXT,
  alerted            BOOLEAN NOT NULL DEFAULT FALSE,   -- team already notified of an issue
  terms_consent      BOOLEAN,                          -- ticked the Terms & Refund policy at checkout
  terms_consent_ts   TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE paid_orders ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_paid_orders_undelivered ON paid_orders(delivered, alerted, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_paid_orders_status      ON paid_orders(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_paid_orders_email       ON paid_orders(email);
