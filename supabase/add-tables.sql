-- Tambahan tabel baru untuk fitur update
-- Jalankan di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  hero_tagline TEXT DEFAULT '',
  hero_subtitle TEXT DEFAULT '',
  hero_cover TEXT DEFAULT '',
  hero_stat_label TEXT DEFAULT '',
  hero_stat_value TEXT DEFAULT '',
  about_image TEXT DEFAULT '',
  about_text TEXT DEFAULT '',
  vision_text TEXT DEFAULT '',
  mission_items TEXT DEFAULT '',
  kontak_whatsapp TEXT DEFAULT '',
  kontak_instagram TEXT DEFAULT '',
  kontak_tiktok TEXT DEFAULT '',
  kontak_youtube TEXT DEFAULT '',
  kontak_twitter TEXT DEFAULT '',
  kontak_email TEXT DEFAULT '',
  kontak_alamat TEXT DEFAULT '',
  cta_text TEXT DEFAULT '',
  cta_link TEXT DEFAULT '',
  cta_link_label TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS kategori (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('artikel', 'galeri')),
  name TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS periode (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE periode ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public all site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all kategori" ON kategori FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all periode" ON periode FOR ALL USING (true) WITH CHECK (true);
