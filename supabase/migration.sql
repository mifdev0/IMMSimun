-- ============================================
-- Migration: IMM Siti Munjiyah Database Schema
-- ============================================

-- 1. ARTICLES
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at DATE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- 2. ARTICLE IMAGES
CREATE TABLE IF NOT EXISTS article_images (
  id TEXT PRIMARY KEY,
  artikel_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_article_images_artikel_id ON article_images(artikel_id);

-- 3. GALERI
CREATE TABLE IF NOT EXISTS galeri (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  event_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. STRUKTURAL (PENGURUS)
CREATE TABLE IF NOT EXISTS structural (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  "group" TEXT NOT NULL CHECK ("group" IN ('pimpinan', 'bidang', 'unit')),
  unit_name TEXT NOT NULL DEFAULT '',
  photo_url TEXT NOT NULL DEFAULT '',
  period TEXT NOT NULL DEFAULT '2025/2026',
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_structural_group ON structural("group");

-- 5. PRESTASI
CREATE TABLE IF NOT EXISTS prestasi (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0
);

-- 6. ADMINS
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'super_admin' CHECK (role IN ('super_admin', 'developer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE structural ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read article_images" ON article_images FOR SELECT USING (true);
CREATE POLICY "Public read galeri" ON galeri FOR SELECT USING (true);
CREATE POLICY "Public read structural" ON structural FOR SELECT USING (true);
CREATE POLICY "Public read prestasi" ON prestasi FOR SELECT USING (true);

-- Authenticated write access (admin only)
CREATE POLICY "Admin write articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write article_images" ON article_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write galeri" ON galeri FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write structural" ON structural FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write prestasi" ON prestasi FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read admins" ON admins FOR SELECT USING (auth.role() = 'authenticated');

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin write images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
