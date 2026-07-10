-- Tambah kolom yang kurang di site_settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_stat_label_2 TEXT DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_stat_value_2 TEXT DEFAULT '';

-- Cek daftar kolom yang ada (debug)
SELECT column_name FROM information_schema.columns WHERE table_name = 'site_settings' ORDER BY ordinal_position;
