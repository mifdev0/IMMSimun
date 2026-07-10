-- Tambah semua kolom yang kurang di site_settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_stat_label_2 TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_stat_value_2 TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_image TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_text TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_text TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS mission_items TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_whatsapp TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_instagram TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_tiktok TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_youtube TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_twitter TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_email TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS kontak_alamat TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS cta_link TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS cta_link_label TEXT DEFAULT '';
